// 環境設定
export const env = {
    // サイト情報
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Sora Studio',
    siteDescription: 'Sora Yamaguchi Portfolio',

    // CMS（Sanity）
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',

    // お問い合わせフォーム
    contactApiUrl: process.env.NEXT_PUBLIC_CONTACT_API_URL || '/api/contact',

    // 開発フラグ
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
} as const;

export type Env = typeof env;
