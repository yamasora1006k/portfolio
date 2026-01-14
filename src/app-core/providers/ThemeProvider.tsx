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

    // Initialize theme on mount
    useEffect(() => {
        const initialize = () => {
            // 1. Check URL parameter first
            const urlSky = searchParams.get(URL_PARAMS.skyTheme);
            const urlTheme = parseSkyFromUrl(urlSky);

            if (urlTheme) {
                setSkyState(prev => ({
                    ...prev,
                    theme: urlTheme,
                    isTransitioning: true,
                }));
            } else {
                // 2. Check localStorage
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
                    // Ignore localStorage errors
                }
            }

            // 3. Start entry transition
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

    // Minor changes timer
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

                // Schedule next change
                const timerId = scheduleMinorChange();
                return () => clearTimeout(timerId);
            }, interval);
        };

        const timerId = scheduleMinorChange();
        return () => clearTimeout(timerId);
    }, [isReady]);

    // Major change timer
    useEffect(() => {
        if (!isReady) return;

        const threshold = getMajorChangeThreshold();

        const timerId = setTimeout(() => {
            setSkyState(prev => ({
                ...prev,
                theme: generateSkyTheme(),
                seed: Date.now(),
                lastChangeTime: Date.now(),
                isTransitioning: true,
            }));

            // Complete transition after animation
            setTimeout(() => {
                setSkyState(prev => ({
                    ...prev,
                    isTransitioning: false,
                }));
            }, 2000);
        }, threshold);

        return () => clearTimeout(timerId);
    }, [isReady, skyState.seed]);

    // Apply CSS variables
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

        // Save to localStorage
        try {
            localStorage.setItem(STORAGE_KEYS.skyTheme, JSON.stringify(theme));
        } catch {
            // Ignore localStorage errors
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
