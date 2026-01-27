import { mockCategories, fetchCategories } from '@/features/works/services/categoryService';
import { CategoryPageClient } from './CategoryPageClient';

// 静的エクスポート時にダイナミックパラメータを無効化
export const dynamicParams = false;

// 静的エクスポート用：ビルド時にすべてのカテゴリスラッグを生成
export async function generateStaticParams() {
    try {
        // Firestoreからカテゴリを取得
        const categories = await fetchCategories();
        return categories.map((category) => ({
            slug: category.slug,
        }));
    } catch {
        // エラー時はモックデータを使用
        return mockCategories.map((category) => ({
            slug: category.slug,
        }));
    }
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    return <CategoryPageClient slug={slug} />;
}
