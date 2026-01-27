import { BlogDetailView } from '@/features/blog/blogDetailView';
import { fetchBlogPostSlugs } from '@/features/blog/services/blogService';

// 静的エクスポート時にダイナミックパラメータを無効化
export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const posts = await fetchBlogPostSlugs();
        console.log('DEBUG: generateStaticParams fetched posts count:', posts.length);
        console.log('DEBUG: slugs:', posts.map(p => p.slug));

        const params = posts.map((post) => ({
            slug: post.slug,
        }));
        return params;
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Next.js 15+ではparamsはPromiseになる可能性がありますが、
// 現在の構成（TSX）に合わせて標準的なProps定義を使います。
// もしビルドエラーが出る場合は `await params` パターンに変更します。

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    return <BlogDetailView slug={slug} />;
}
