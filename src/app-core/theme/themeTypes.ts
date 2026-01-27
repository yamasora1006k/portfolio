// Sky Change System 用のスカイテーマ型定義
export interface SkyThemeColors {
  // 背景グラデーション色
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;

  // UI用カラー
  accentColor: string;
  textPrimary: string;
  textSecondary: string;

  // エフェクト
  axisColor: string;
  cloudColor: string;
}

export interface SkyThemeParams {
  // 視覚的プロパティ
  backgroundGradient: string;
  accentColor: string;
  textMode: 'light' | 'dark';
  cloudDensity: number;      // 0〜100
  noiseStrength: number;     // 0〜100
  axisVisibility: number;    // 10〜50
  transitionStyle: 'smooth' | 'fade' | 'dissolve';
  showClouds: boolean;       // 雲を表示するかどうか

  // 派生カラー
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
  duration: number;    // ミリ秒
  easing: string;
}

// ブレークポイント定義
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface BreakpointConfig {
  mobile: number;   // 〜480px
  tablet: number;   // 481〜900px
  desktop: number;  // 901〜1200px
  wide: number;     // 1201px〜
}
