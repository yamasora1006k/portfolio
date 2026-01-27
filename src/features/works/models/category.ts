// カテゴリデータの型定義
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    order: number;  // 表示順
    createdAt?: Date;
    updatedAt?: Date;
}

// カテゴリ入力データ
export type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
