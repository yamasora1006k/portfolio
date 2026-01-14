import { SkyThemeParams, SkyThemeColors } from './themeTypes';
import { SKY_PARAMS, SKY_TIMING } from '../config/constants';

// Seeded random number generator for reproducibility
function seededRandom(seed: number): () => number {
    return function () {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    };
}

// Generate a random number in range using seeded random
function randomInRange(random: () => number, min: number, max: number): number {
    return min + random() * (max - min);
}

// Sky blue palette - bright and cheerful variations
const SKY_BLUES = [
    { base: '#8BC4E8', light: '#A8D4EE', dark: '#6BB4E0' },  // Classic sky blue
    { base: '#87CEEB', light: '#B0E0F0', dark: '#5CBCE8' },  // Light sky blue
    { base: '#7EC8E3', light: '#A0D8ED', dark: '#5AB8DD' },  // Soft sky blue
    { base: '#89CFF0', light: '#ADE0F5', dark: '#65BFE8' },  // Baby blue
    { base: '#76D7EA', light: '#9BE4F0', dark: '#52CAE0' },  // Aqua sky
    { base: '#A5D8E6', light: '#C0E5EE', dark: '#8ACBDE' },  // Pale sky
];

// Generate colors for bright sky theme
function generateColors(
    skyBlue: typeof SKY_BLUES[0],
): SkyThemeColors {
    return {
        // Background - solid sky blue
        gradientStart: skyBlue.light,
        gradientMiddle: skyBlue.base,
        gradientEnd: skyBlue.dark,

        // UI colors - dark text on light background
        accentColor: '#2D5A7B',
        textPrimary: 'rgba(0, 0, 0, 0.85)',
        textSecondary: 'rgba(0, 0, 0, 0.6)',

        // Effects
        axisColor: 'transparent',
        cloudColor: 'rgba(255, 255, 255, 0.95)',
    };
}

// Generate a random sky theme - now with bright blue sky
export function generateSkyTheme(seed?: number): SkyThemeParams {
    const actualSeed = seed ?? Date.now();
    const random = seededRandom(actualSeed);

    // Pick a random sky blue
    const skyBlue = SKY_BLUES[Math.floor(random() * SKY_BLUES.length)];
    const colors = generateColors(skyBlue);

    const cloudDensity = randomInRange(random, 30, 70);
    const noiseStrength = 0; // No noise for clean look

    // Simple solid gradient for sky
    const backgroundGradient = `linear-gradient(
    180deg,
    ${colors.gradientStart} 0%,
    ${colors.gradientMiddle} 50%,
    ${colors.gradientEnd} 100%
  )`;

    return {
        backgroundGradient,
        accentColor: colors.accentColor,
        textMode: 'dark', // Always dark text on bright sky
        cloudDensity,
        noiseStrength,
        axisVisibility: 0, // No axis
        transitionStyle: 'smooth',
        colors,
    };
}

// Create initial sky state
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

// Calculate entry transition duration
export function getEntryTransitionDuration(): number {
    const { entryTransitionMin, entryTransitionMax } = SKY_TIMING;
    return Math.random() * (entryTransitionMax - entryTransitionMin) + entryTransitionMin;
}

// Calculate next minor change interval
export function getMinorChangeInterval(): number {
    const { min, max } = SKY_TIMING.minorChangeInterval;
    return Math.random() * (max - min) + min;
}

// Calculate major change threshold
export function getMajorChangeThreshold(): number {
    const { min, max } = SKY_TIMING.majorChangeThreshold;
    return Math.random() * (max - min) + min;
}

// Apply minor variations - just shift cloud density slightly
export function applyMinorVariation(theme: SkyThemeParams, seed: number): SkyThemeParams {
    const random = seededRandom(seed);
    const cloudDelta = (random() - 0.5) * 5;

    return {
        ...theme,
        cloudDensity: Math.max(20, Math.min(80, theme.cloudDensity + cloudDelta)),
    };
}

// Parse sky theme from URL parameter
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
