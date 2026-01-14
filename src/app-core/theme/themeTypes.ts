// Sky Theme types for the Sky Change System
export interface SkyThemeColors {
  // Background gradient colors
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;
  
  // UI colors
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
  
  // Effects
  axisColor: string;
  cloudColor: string;
}

export interface SkyThemeParams {
  // Visual properties
  backgroundGradient: string;
  accentColor: string;
  textMode: 'light' | 'dark';
  cloudDensity: number;      // 0-100
  noiseStrength: number;     // 0-100
  axisVisibility: number;    // 10-50
  transitionStyle: 'smooth' | 'fade' | 'dissolve';
  
  // Derived colors
  colors: SkyThemeColors;
}

export interface SkyState {
  theme: SkyThemeParams;
  seed: number;
  lastChangeTime: number;
  transitionProgress: number;
  isTransitioning: boolean;
}

export type TransitionType = 'entry' | 'minor' | 'major';

export interface SkyTransitionConfig {
  type: TransitionType;
  duration: number;    // ms
  easing: string;
}

// Breakpoint definitions
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface BreakpointConfig {
  mobile: number;   // ~480px
  tablet: number;   // 481-900px
  desktop: number;  // 901-1200px
  wide: number;     // 1201px~
}
