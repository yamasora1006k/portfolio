// Application-wide constants
export const BREAKPOINTS = {
    mobile: 480,
    tablet: 900,
    desktop: 1200,
    wide: 1201,
} as const;

// Tap target minimum size (accessibility)
export const MIN_TAP_TARGET_SIZE = 44;

// Sky Change System timing
export const SKY_TIMING = {
    entryTransitionMin: 800,
    entryTransitionMax: 1800,
    minorChangeInterval: {
        min: 30000,   // 30 seconds
        max: 120000,  // 2 minutes
    },
    majorChangeThreshold: {
        min: 300000,  // 5 minutes
        max: 480000,  // 8 minutes
    },
} as const;

// Sky Theme parameter ranges
export const SKY_PARAMS = {
    hue: { min: 0, max: 360 },
    saturation: { min: 20, max: 80 },
    lightness: { min: 30, max: 80 },
    cloudDensity: { min: 0, max: 100 },
    noiseStrength: { min: 0, max: 100 },
    axisVisibility: { min: 10, max: 50 },
} as const;

// URL parameter keys
export const URL_PARAMS = {
    skyTheme: 'sky',
    worksFilter: 'filter',
    worksSearch: 'q',
    worksSort: 'sort',
    worksYear: 'year',
    worksTech: 'tech',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
    skyTheme: 'sky-variants-theme',
    skyPreference: 'sky-variants-preference',
} as const;

// Navigation links
export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
] as const;
