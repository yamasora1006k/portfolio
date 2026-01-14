// Work item type definition
export interface Work {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    technologies: string[];
    year: number;
    featured: boolean;

    // Detailed sections (for detail page)
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

// Filter/Sort options
export type SortOption = 'newest' | 'oldest' | 'featured';
export type CategoryFilter = 'all' | string;

export interface WorksFilter {
    category: CategoryFilter;
    technology: string | null;
    year: number | null;
    search: string;
    sort: SortOption;
}
