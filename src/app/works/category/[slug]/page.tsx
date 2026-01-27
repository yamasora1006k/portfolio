import { mockCategories } from '@/features/works/services/categoryService';
import { CategoryPageClient } from './CategoryPageClient';

// 静的エクスポート用：ビルド時にすべてのカテゴリスラッグを生成
export function generateStaticParams() {
    return mockCategories.map((category) => ({
        slug: category.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    return <CategoryPageClient slug={slug} />;
}
