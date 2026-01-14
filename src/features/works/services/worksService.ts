import { Work } from '../models/work';

// Mock data for development - will be replaced with CMS data
export const mockWorks: Work[] = [
    {
        id: '1',
        slug: 'sky-variants-portfolio',
        title: 'SKY VARIANTS',
        description: '動的に変化する空をコンセプトにしたポートフォリオサイト',
        thumbnail: '/images/works/sky-variants.jpg',
        category: 'Web Development',
        technologies: ['Next.js', 'TypeScript', 'CSS'],
        year: 2024,
        featured: true,
        background: 'ポートフォリオサイトを刷新するにあたり、「同じ人でも、見る人・見る瞬間によって違う印象を持つ」という体験を設計したいと考えました。',
        challenge: '単なる作品一覧ではなく、訪問するたびに異なる印象を与えるUIを実現すること。',
        role: 'デザイン・開発（フルスタック）',
        process: 'コンセプト策定 → ワイヤーフレーム → Sky Change Systemの設計 → 実装 → テスト',
        implementation: 'Next.js App Routerを使用し、CSS Variablesとシード付き乱数で「破綻しないランダム」を実現。',
        outcome: '訪問するたびに異なる空が表示され、滞在中も徐々に変化するインタラクティブな体験を実現。',
        lessons: 'ランダム性と再現性のバランス、パフォーマンスを考慮したアニメーション設計の重要性を学びました。',
    },
    {
        id: '2',
        slug: 'task-management-app',
        title: 'Task Flow',
        description: '直感的なタスク管理アプリケーション',
        thumbnail: '/images/works/taskflow.jpg',
        category: 'Web Application',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        year: 2024,
        featured: true,
        background: '日々のタスク管理をより効率的に行いたいというニーズから開発を開始。',
        challenge: 'シンプルさと機能性の両立。',
        role: 'フロントエンド開発',
        process: 'ユーザーリサーチ → プロトタイプ → 開発 → ユーザーテスト',
        implementation: 'React + Redux Toolkitでstate管理、REST APIでバックエンド連携。',
        outcome: 'ユーザーテストで高い評価を獲得。',
        lessons: 'ユーザー中心設計の重要性を実感。',
    },
    {
        id: '3',
        slug: 'e-commerce-redesign',
        title: 'EC Site Redesign',
        description: 'ECサイトのUIリデザインプロジェクト',
        thumbnail: '/images/works/ec-redesign.jpg',
        category: 'UI/UX Design',
        technologies: ['Figma', 'Prototyping'],
        year: 2023,
        featured: false,
        background: 'コンバージョン率向上のためのUIリデザイン依頼。',
        challenge: '既存ユーザーの使いやすさを維持しながら、新規ユーザーにもわかりやすいデザイン。',
        role: 'UIデザイナー',
        process: '現状分析 → ユーザーインタビュー → デザイン → プロトタイプ',
        implementation: 'Figmaでプロトタイプを作成し、ユーザーテストを実施。',
        outcome: 'コンバージョン率15%向上。',
        lessons: 'データドリブンなデザイン決定の有効性。',
    },
    {
        id: '4',
        slug: 'mobile-fitness-app',
        title: 'FitTrack',
        description: 'フィットネストラッキングモバイルアプリ',
        thumbnail: '/images/works/fittrack.jpg',
        category: 'Mobile App',
        technologies: ['Flutter', 'Firebase', 'Dart'],
        year: 2023,
        featured: true,
        background: '運動習慣をゲーム感覚で継続できるアプリを開発。',
        challenge: 'モチベーション維持のためのゲーミフィケーション設計。',
        role: 'モバイルアプリ開発',
        process: 'コンセプト → プロトタイプ → 開発 → ベータテスト → リリース',
        implementation: 'FlutterでクロスプラットフォームDevelopment、FirebaseでバックエンAllow。',
        outcome: 'App Storeで4.5星評価獲得。',
        lessons: 'ユーザーフィードバックの重要性を再認識。',
    },
];

// Get all unique categories
export function getCategories(works: Work[]): string[] {
    const categories = new Set(works.map(w => w.category));
    return Array.from(categories);
}

// Get all unique technologies
export function getTechnologies(works: Work[]): string[] {
    const technologies = new Set(works.flatMap(w => w.technologies));
    return Array.from(technologies);
}

// Get all unique years
export function getYears(works: Work[]): number[] {
    const years = new Set(works.map(w => w.year));
    return Array.from(years).sort((a, b) => b - a);
}

// Fetch all works (mock)
export async function fetchWorks(): Promise<Work[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockWorks;
}

// Fetch work by slug (mock)
export async function fetchWorkBySlug(slug: string): Promise<Work | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockWorks.find(w => w.slug === slug) || null;
}

// Fetch featured works (mock)
export async function fetchFeaturedWorks(): Promise<Work[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockWorks.filter(w => w.featured);
}
