// 作品データの型定義
export interface Work {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    categoryId: string;      // カテゴリID（新規追加）
    category: string;        // カテゴリ名（表示用、後方互換性のため残す）
    technologies: string[];
    date: string;            // YYYY-MM-DD
    year?: number;           // @deprecated: use date instead
    featured: boolean;

    // 詳細ページ用のセクション
    background?: string;    // なぜやったか
    challenge?: string;     // 課題
    role?: string;          // 役割
    process?: string;       // プロセス
    implementation?: string; // 実装
    outcome?: string;       // 成果
    lessons?: string;       // 学び

    images?: string[];
    liveUrl?: string;
    githubUrl?: string;
}

// フィルター・ソートの選択肢
export type SortOption = 'newest' | 'oldest' | 'featured';
export type CategoryFilter = 'all' | string;

export interface WorksFilter {
    category: CategoryFilter;
    technology: string | null;
    year?: number | null; // Filter by year logic might still be useful
    search: string;
    sort: SortOption;
}
