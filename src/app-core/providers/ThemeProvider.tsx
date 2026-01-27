'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    ReactNode,
} from 'react';
import { useSearchParams } from 'next/navigation';
import {
    SkyThemeParams,
    SkyState,
} from '../theme/themeTypes';
import {
    generateSkyTheme,
    createInitialSkyState,
    parseSkyFromUrl,
    applyMinorVariation,
    getEntryTransitionDuration,
    getMinorChangeInterval,
    getMajorChangeThreshold,
} from '../theme/skyTheme';
import { STORAGE_KEYS, URL_PARAMS } from '../config/constants';

interface SkyContextValue {
    skyState: SkyState;
    setTheme: (theme: SkyThemeParams) => void;
    regenerateTheme: () => void;
    isReady: boolean;
}

const SkyContext = createContext<SkyContextValue | null>(null);

export function useSky() {
    const context = useContext(SkyContext);
    if (!context) {
        throw new Error('useSky must be used within a SkyProvider');
    }
    return context;
}

interface SkyProviderProps {
    children: ReactNode;
}

export function SkyProvider({ children }: SkyProviderProps) {
    const searchParams = useSearchParams();
    const [skyState, setSkyState] = useState<SkyState>(() => createInitialSkyState());
    const [isReady, setIsReady] = useState(false);

    // マウント時にテーマを初期化
    useEffect(() => {
        const initialize = () => {
            // 1. URLパラメータを最優先で参照
            const urlSky = searchParams.get(URL_PARAMS.skyTheme);
            const urlTheme = parseSkyFromUrl(urlSky);

            if (urlTheme) {
                setSkyState(prev => ({
                    ...prev,
                    theme: urlTheme,
                    isTransitioning: true,
                }));
            } else {
                // 2. なければ localStorage を確認
                try {
                    const stored = localStorage.getItem(STORAGE_KEYS.skyTheme);
                    if (stored) {
                        const storedTheme = JSON.parse(stored) as SkyThemeParams;
                        setSkyState(prev => ({
                            ...prev,
                            theme: storedTheme,
                            isTransitioning: true,
                        }));
                    }
                } catch {
                    // localStorage エラーは握りつぶす
                }
            }

            // 3. エントリートランジションを開始
            const transitionDuration = getEntryTransitionDuration();

            setTimeout(() => {
                setSkyState(prev => ({
                    ...prev,
                    isTransitioning: false,
                    transitionProgress: 1,
                }));
                setIsReady(true);
            }, transitionDuration);
        };

        initialize();
    }, [searchParams]);

    // マイナー変化のタイマー
    useEffect(() => {
        if (!isReady) return;

        const scheduleMinorChange = () => {
            const interval = getMinorChangeInterval();

            return setTimeout(() => {
                setSkyState(prev => ({
                    ...prev,
                    theme: applyMinorVariation(prev.theme, Date.now()),
                    lastChangeTime: Date.now(),
                }));

                // 次の変化を予約
                const timerId = scheduleMinorChange();
                return () => clearTimeout(timerId);
            }, interval);
        };

        const timerId = scheduleMinorChange();
        return () => clearTimeout(timerId);
    }, [isReady]);

    // 定期的な時間チェック（1分ごとに時間帯の変化を確認）
    useEffect(() => {
        if (!isReady) return;

        const checkTime = () => {
            // 現在のテーマを再生成（時間帯が変わっていれば色が大きく変わる）
            // 時間帯が変わらない場合は、マイナー変化（雲の動きなど）だけに留めたいが、
            // シンプルに generateSkyTheme を呼ぶと、同じ時間帯内でもランダムに変わってしまう可能性がある。
            // ここでは時間帯が変わった時だけ変えたい...が、ユーザーは「見るたびに違う」も求めている。
            // 折衷案：
            // 1. 時間帯が変わったら強制更新
            // 2. それ以外は長めのインターバルで更新

            setSkyState(prev => {
                const newTheme = generateSkyTheme(); // 現在時刻に基づいたテーマ

                // ここで前回のテーマと時間帯区分を比較するロジックがあれば良いが、
                // 簡易的に「常に最新の時間帯に合わせる」＆「時間帯内でのバリエーション変化は適度に行う」とする

                return {
                    ...prev,
                    theme: newTheme,
                    seed: Date.now(),
                    lastChangeTime: Date.now(),
                    isTransitioning: true,
                };
            });

            setTimeout(() => {
                setSkyState(prev => ({
                    ...prev,
                    isTransitioning: false,
                }));
            }, 2000);
        };

        // 30分ごとにチェック（時間帯の変化に追従）
        const intervalId = setInterval(checkTime, 30 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [isReady]);

    // CSS変数を適用
    useEffect(() => {
        const { theme } = skyState;
        const root = document.documentElement;

        root.style.setProperty('--sky-background', theme.backgroundGradient);
        root.style.setProperty('--sky-accent', theme.accentColor);
        root.style.setProperty('--sky-text-primary', theme.colors.textPrimary);
        root.style.setProperty('--sky-text-secondary', theme.colors.textSecondary);
        root.style.setProperty('--sky-axis-color', theme.colors.axisColor);
        root.style.setProperty('--sky-cloud-color', theme.colors.cloudColor);
        root.style.setProperty('--sky-cloud-density', `${theme.cloudDensity}%`);
        root.style.setProperty('--sky-noise-strength', `${theme.noiseStrength}%`);
        root.style.setProperty('--sky-axis-visibility', `${theme.axisVisibility}%`);
        root.style.setProperty('--sky-text-mode', theme.textMode);
    }, [skyState.theme]);

    const setTheme = useCallback((theme: SkyThemeParams) => {
        setSkyState(prev => ({
            ...prev,
            theme,
            lastChangeTime: Date.now(),
        }));

        // localStorageに保存
        try {
            localStorage.setItem(STORAGE_KEYS.skyTheme, JSON.stringify(theme));
        } catch {
            // localStorage エラーは握りつぶす
        }
    }, []);

    const regenerateTheme = useCallback(() => {
        const newTheme = generateSkyTheme();
        setTheme(newTheme);
    }, [setTheme]);

    const value = useMemo(
        () => ({
            skyState,
            setTheme,
            regenerateTheme,
            isReady,
        }),
        [skyState, setTheme, regenerateTheme, isReady]
    );

    return (
        <SkyContext.Provider value={value}>
            {children}
        </SkyContext.Provider>
    );
}
