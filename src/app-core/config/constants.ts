// アプリ全体で使う定数
export const BREAKPOINTS = {
    mobile: 480,
    tablet: 900,
    desktop: 1200,
    wide: 1201,
} as const;

// タップターゲットの最小サイズ（アクセシビリティ）
export const MIN_TAP_TARGET_SIZE = 44;

// ベースパス（next.config.tsと合わせる）
export const BASE_PATH = '/portfolio';

// Sky Change System のタイミング設定
export const SKY_TIMING = {
    entryTransitionMin: 800,
    entryTransitionMax: 1800,
    minorChangeInterval: {
        min: 30000,   // 30秒
        max: 120000,  // 2分
    },
    majorChangeThreshold: {
        min: 300000,  // 5分
        max: 480000,  // 8分
    },
} as const;

// スカイテーマのパラメータ範囲
export const SKY_PARAMS = {
    hue: { min: 0, max: 360 },
    saturation: { min: 20, max: 80 },
    lightness: { min: 30, max: 80 },
    cloudDensity: { min: 0, max: 100 },
    noiseStrength: { min: 0, max: 100 },
    axisVisibility: { min: 10, max: 50 },
} as const;

// URLパラメータキー
export const URL_PARAMS = {
    skyTheme: 'sky',
    worksFilter: 'filter',
    worksSearch: 'q',
    worksSort: 'sort',
    worksYear: 'year',
    worksTech: 'tech',
} as const;

// ローカルストレージキー
export const STORAGE_KEYS = {
    skyTheme: 'sky-variants-theme',
    skyPreference: 'sky-variants-preference',
} as const;

// ナビゲーションリンク
export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
] as const;
