import { SkyThemeParams, SkyThemeColors } from './themeTypes';
import { SKY_TIMING } from '../config/constants';

// 同じシードで再現可能な乱数生成器
function seededRandom(seed: number): () => number {
    return function () {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    };
}

// シード付き乱数で指定範囲の値を生成
function randomInRange(random: () => number, min: number, max: number): number {
    return min + random() * (max - min);
}

// ----------------------------------------------------------------------
// リアルな空のカラーパレット定義
// ----------------------------------------------------------------------

type SkyPalette = {
    name: string;
    colors: {
        top: string;    // グラデーション開始色 (上空)
        middle: string; // グラデーション中間色
        bottom: string; // グラデーション終了色 (地平線付近)
    };
    accent: string;      // アクセントカラー (ボタンなど)
    textPrimary: string; // メインテキスト色
    textSecondary: string; // サブテキスト色
    cloud: string;       // 雲の色
    showClouds?: boolean; // 雲を表示するか (デフォルトtrue)
    stars: boolean;      // 星を表示するか (将来拡張用)
};

const PALETTES: Record<string, SkyPalette[]> = {
    // 夜明け (Dawn)
    dawn: [
        {
            name: 'Golden Dawn',
            colors: { top: '#4B6CB7', middle: '#728FCE', bottom: '#F8CDDA' }, // 青からピンクへ
            accent: '#E65100', // オレンジ系を濃く
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 240, 240, 0.9)',
            stars: true,
        },
        {
            name: 'Misty Morning',
            colors: { top: '#606c88', middle: '#8E9EAB', bottom: '#D7DDE8' }, // 霧がかった朝
            accent: '#5D7EA7',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(240, 240, 255, 0.9)',
            stars: false,
        },
        {
            name: 'Rose Dawn',
            colors: { top: '#5B86E5', middle: '#86A8E7', bottom: '#FFDEE9' },  // 青からピンクへの朝焼け
            accent: '#5B86E5',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 220, 220, 0.8)',
            stars: true,
        },
        {
            name: 'Lavender Morning',
            colors: { top: '#E6E6FA', middle: '#DDA0DD', bottom: '#87CEEB' }, // 薄紫から水色
            accent: '#9370DB',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 250, 255, 0.9)',
            stars: false,
        },
        {
            name: 'Cold Frost',
            colors: { top: '#004e92', middle: '#000428', bottom: '#DDDDDD' }, // 寒色の朝
            accent: '#004e92',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(240, 248, 255, 0.8)',
            stars: true,
        },
    ],
    // 日中 (Day)
    day: [
        {
            name: 'Clear Day',
            colors: { top: '#2980B9', middle: '#6DD5FA', bottom: '#FFFFFF' }, // 澄んだ青空
            accent: '#2980B9',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Deep Blue Sky',
            colors: { top: '#005C97', middle: '#363795', bottom: '#005C97' }, // 深い青
            accent: '#00C6FF',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
        },
        {
            name: 'Soft Cyan',
            colors: { top: '#56CCF2', middle: '#89CFF0', bottom: '#2F80ED' },
            accent: '#2F80ED',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
        },
        {
            name: 'Azure Breeze',
            colors: { top: '#4A90D9', middle: '#87CEEB', bottom: '#F0F8FF' }, // 爽やかな水色
            accent: '#4A90D9',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
        },
        {
            name: 'Overcast',
            colors: { top: '#3E5151', middle: '#DECBA4', bottom: '#E0E0E0' }, // 曇り空
            accent: '#3E5151',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(200, 200, 200, 0.9)',
            stars: false,
        },
        {
            name: 'Summer Sky',
            colors: { top: '#1E90FF', middle: '#87CEFA', bottom: '#FFFFFF' }, // 夏の青空
            accent: '#1E90FF',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
        },
        {
            name: 'True Blue',
            colors: { top: '#4FACFE', middle: '#00F2FE', bottom: '#FFFFFF' }, // 王道の青
            accent: '#00F2FE',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Sky Blue',
            colors: { top: '#89f7fe', middle: '#66a6ff', bottom: '#FFFFFF' }, // 爽やかな青
            accent: '#66a6ff',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Just Sky',
            colors: { top: '#00c6fb', middle: '#005bea', bottom: '#FFFFFF' }, // 鮮やかな青
            accent: '#005bea',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Aqua Clear',
            colors: { top: '#89F7FE', middle: '#66A6FF', bottom: '#FFFFFF' }, // アクアブルー
            accent: '#66A6FF',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Pale Sky',
            colors: { top: '#E0F7FA', middle: '#80DEEA', bottom: '#FFFFFF' }, // ペールシアン
            accent: '#00BCD4',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Crystal Sky',
            colors: { top: '#6BB3F2', middle: '#A8D8F0', bottom: '#FFFFFF' }, // 透き通った青空
            accent: '#4A90D9',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Serene Blue',
            colors: { top: '#3A7BD5', middle: '#00D2FF', bottom: '#E8F4FD' }, // 穏やかな青空
            accent: '#3A7BD5',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: true,
        },
        {
            name: 'Horizon Glow',
            colors: { top: '#2193B0', middle: '#6DD5ED', bottom: '#FFF8E7' }, // 地平線の輝き
            accent: '#2193B0',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
            showClouds: true,
        },
        {
            name: 'Spring Morning',
            colors: { top: '#74B9FF', middle: '#A3E4FF', bottom: '#FFEEF8' }, // 春の朝
            accent: '#5DADE2',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: true,
        },
        {
            name: 'Ocean Breeze',
            colors: { top: '#0072FF', middle: '#00C6FF', bottom: '#F0FFFF' }, // 海辺の空
            accent: '#0072FF',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.9)',
            stars: false,
            showClouds: false,
        },
        {
            name: 'Dreamy Afternoon',
            colors: { top: '#667EEA', middle: '#A8C0FF', bottom: '#FFFFFF' }, // 夢見心地の午後
            accent: '#667EEA',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.95)',
            stars: false,
            showClouds: true,
        },
    ],
    // 夕暮れ (Dusk)
    dusk: [
        {
            name: 'Warm Sunset',
            colors: { top: '#3A6186', middle: '#F67280', bottom: '#FFE4C4' }, // 暖かい夕日
            accent: '#FF9068',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 220, 200, 0.8)',
            stars: false,
        },
        {
            name: 'Coral Evening',
            colors: { top: '#2980B9', middle: '#F2A65A', bottom: '#FFE4B5' }, // コーラル色の夕日
            accent: '#F2A65A',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 240, 220, 0.8)',
            stars: false,
        },
        {
            name: 'Golden Hour',
            colors: { top: '#FF9966', middle: '#FF5E62', bottom: '#FFFFFF' }, // 黄金色の夕暮れ
            accent: '#FF9966',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 240, 220, 0.8)',
            stars: false,
        },
        {
            name: 'Sweet Sunset',
            colors: { top: '#FF5F6D', middle: '#FFC371', bottom: '#FFFFFF' }, // 甘い夕日
            accent: '#FF5F6D',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 230, 230, 0.8)',
            stars: false,
        },
        {
            name: 'Peach Sky',
            colors: { top: '#355C7D', middle: '#F8B195', bottom: '#FFEFD5' }, // 桃色の空
            accent: '#F67280',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 230, 220, 0.8)',
            stars: false,
        },
        {
            name: 'Silky Evening',
            colors: { top: '#DAE2F8', middle: '#D6A4A4', bottom: '#FFFFFF' }, // シルキーな夕暮れ
            accent: '#D6A4A4',
            textPrimary: 'rgba(0, 0, 0, 0.85)',
            textSecondary: 'rgba(0, 0, 0, 0.6)',
            cloud: 'rgba(255, 250, 250, 0.9)',
            stars: false,
        },
        {
            name: 'Cotton Candy',
            colors: { top: '#4A6FA5', middle: '#F3904F', bottom: '#FFE4B5' }, // コットンキャンディ
            accent: '#F3904F',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 230, 200, 0.8)',
            stars: false,
        },
        {
            name: 'Burning Sunset',
            colors: { top: '#1E3A5F', middle: '#FF6B35', bottom: '#FFD93D' }, // 燃える夕日
            accent: '#FF6B35',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 200, 150, 0.8)',
            stars: false,
        },
        {
            name: 'Tropical Sunset',
            colors: { top: '#2C5F8D', middle: '#FF8C42', bottom: '#FFF275' }, // トロピカルサンセット
            accent: '#FF8C42',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 220, 180, 0.8)',
            stars: false,
        },
        {
            name: 'Rose Horizon',
            colors: { top: '#355C7D', middle: '#F67280', bottom: '#FFEAA7' }, // バラ色の地平線
            accent: '#F67280',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 220, 200, 0.8)',
            stars: false,
        },
        {
            name: 'Amber Glow',
            colors: { top: '#3D5A80', middle: '#F4A460', bottom: '#FFDEAD' }, // 琥珀色の輝き
            accent: '#F4A460',
            textPrimary: 'rgba(255, 255, 255, 0.95)',
            textSecondary: 'rgba(255, 255, 255, 0.7)',
            cloud: 'rgba(255, 235, 210, 0.8)',
            stars: false,
        },
    ],
    // 夜 (Night)
    night: [
        {
            name: 'Midnight Blue',
            colors: { top: '#1A3A5C', middle: '#2C5A7C', bottom: '#3D7A9E' }, // 深い青の夜空
            accent: '#4CA1AF',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.15)',
            stars: true,
        },
        {
            name: 'Deep Blue',
            colors: { top: '#1E3C72', middle: '#2A5298', bottom: '#4A7AB7' }, // 濃い青のグラデーション
            accent: '#6BB3F2',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(255, 255, 255, 0.1)',
            stars: true,
        },
        {
            name: 'Clear Night',
            colors: { top: '#0A2540', middle: '#1C4F7C', bottom: '#3A7CA5' }, // 澄んだ夜空
            accent: '#5DADE2',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(200, 220, 255, 0.15)',
            stars: true,
        },
        {
            name: 'Navy Twilight',
            colors: { top: '#1F3A5F', middle: '#3D5A80', bottom: '#5C7AA0' }, // ネイビーの夕暮れ後
            accent: '#E0FBFC',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(150, 150, 150, 0.2)',
            stars: true,
        },
        {
            name: 'Evening Calm',
            colors: { top: '#243B55', middle: '#3B5975', bottom: '#527895' }, // 静かな宵の空
            accent: '#98C1D9',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(150, 180, 200, 0.15)',
            stars: true,
        },
        {
            name: 'Soft Night',
            colors: { top: '#2D4059', middle: '#435B78', bottom: '#5A7898' }, // 柔らかな夜
            accent: '#A8D0E6',
            textPrimary: 'rgba(255, 255, 255, 0.9)',
            textSecondary: 'rgba(255, 255, 255, 0.6)',
            cloud: 'rgba(200, 220, 240, 0.15)',
            stars: true,
        },
    ],
};

function flattenPalettes(palettes: typeof PALETTES): SkyPalette[] {
    return Object.values(palettes).flat();
}

const ALL_PALETTES = flattenPalettes(PALETTES);

// 時間帯に基づいてパレットを取得
export function getSkyThemeForTime(date: Date = new Date(), seed?: number): SkyThemeParams {
    const hours = date.getHours();
    const actualSeed = seed ?? Date.now();
    const random = seededRandom(actualSeed);

    let targetPalettes: SkyPalette[];

    // Dawn: 5:00 - 8:00
    if (hours >= 5 && hours < 8) {
        targetPalettes = PALETTES.dawn;
    }
    // Day: 8:00 - 16:00
    else if (hours >= 8 && hours < 16) {
        targetPalettes = PALETTES.day;
    }
    // Dusk: 16:00 - 19:00
    else if (hours >= 16 && hours < 19) {
        targetPalettes = PALETTES.dusk;
    }
    // Night: 19:00 - 5:00
    else {
        targetPalettes = PALETTES.night;
    }

    // 時間帯の中からランダムに1つ選択（日によって違う空になるように）
    // note: 日付ベースのシードにするとその日はずっと同じ色になるが、
    // ここではリロードごとに変わる余地を残すか、日付依存にするか。
    // ユーザー要望は「ランダムのせいで見づらい」なので、ある程度固定したいかもしれないが、
    // 「同じ空でも見るたびに違う」コンセプトも維持したい。
    // 解決策：時間帯パレット内でランダムにするが、全てのパレットが視認性確保されていることが前提。
    // 先ほど全パレット修正したので大丈夫なはず。
    const palette = targetPalettes[Math.floor(random() * targetPalettes.length)];

    const cloudDensity = randomInRange(random, 20, 60);
    const noiseStrength = 0;

    const backgroundGradient = `linear-gradient(
    180deg,
    ${palette.colors.top} 0%,
    ${palette.colors.middle} 50%,
    ${palette.colors.bottom} 100%
  )`;

    const textMode = (palette.name.includes('Night') || palette.name.includes('Dawn') || palette.name.includes('Deep Blue') || palette.name.includes('Purple') || palette.name.includes('Sunset'))
        ? 'light'
        : 'dark';

    // 色情報の形式変換
    const colors: SkyThemeColors = {
        gradientStart: palette.colors.top,
        gradientMiddle: palette.colors.middle,
        gradientEnd: palette.colors.bottom,
        accentColor: palette.accent,
        textPrimary: palette.textPrimary,
        textSecondary: palette.textSecondary,
        axisColor: 'transparent',
        cloudColor: palette.cloud,
    };

    return {
        backgroundGradient,
        accentColor: colors.accentColor,
        textMode,
        cloudDensity,
        noiseStrength,
        axisVisibility: 0,
        transitionStyle: 'smooth',
        showClouds: palette.showClouds ?? true, // デフォルトは表示
        colors,
    };
}

// ----------------------------------------------------------------------
// テーマ生成ロジック
// ----------------------------------------------------------------------

export function generateSkyTheme(seed?: number): SkyThemeParams {
    return getSkyThemeForTime(new Date(), seed);
}

// 初期スカイ状態を生成
export function createInitialSkyState(seed?: number) {
    const actualSeed = seed ?? Date.now();
    return {
        theme: generateSkyTheme(actualSeed),
        seed: actualSeed,
        lastChangeTime: Date.now(),
        transitionProgress: 0,
        isTransitioning: true,
    };
}

// 最初の遷移時間を計算
export function getEntryTransitionDuration(): number {
    const { entryTransitionMin, entryTransitionMax } = SKY_TIMING;
    return Math.random() * (entryTransitionMax - entryTransitionMin) + entryTransitionMin;
}

// 次のマイナー変化までの間隔を計算
export function getMinorChangeInterval(): number {
    const { min, max } = SKY_TIMING.minorChangeInterval;
    return Math.random() * (max - min) + min;
}

// メジャー変化の閾値を計算
export function getMajorChangeThreshold(): number {
    const { min, max } = SKY_TIMING.majorChangeThreshold;
    return Math.random() * (max - min) + min;
}

// 小さな変化を適用（クラウド密度を少し揺らす）
export function applyMinorVariation(theme: SkyThemeParams, seed: number): SkyThemeParams {
    const random = seededRandom(seed);
    const cloudDelta = (random() - 0.5) * 5;

    return {
        ...theme,
        cloudDensity: Math.max(10, Math.min(90, theme.cloudDensity + cloudDelta)),
    };
}

// URLパラメータからスカイテーマを解釈
export function parseSkyFromUrl(skyParam: string | null): SkyThemeParams | null {
    if (!skyParam) return null;

    try {
        const seed = parseInt(skyParam, 10);
        if (!isNaN(seed)) {
            return generateSkyTheme(seed);
        }
        return null;
    } catch {
        return null;
    }
}
