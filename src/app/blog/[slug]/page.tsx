import { BlogDetailView } from '@/features/blog/blogDetailView';
import { fetchBlogPostSlugs, mockBlogPosts } from '@/features/blog/services/blogService';

// 静的エクスポート時にダイナミックパラメータを無効化
export const dynamicParams = false;

export async function generateStaticParams() {
    // モックデータのslugを取得（フォールバック用）
    const mockSlugs = mockBlogPosts.map((post) => ({
        slug: post.slug,
    }));

    try {
        const posts = await fetchBlogPostSlugs();
        console.log('DEBUG: generateStaticParams fetched posts count:', posts.length);

        if (posts.length === 0) {
            console.log('Firestore is empty, using mock blog data');
            return mockSlugs;
        }

        const firestoreSlugs = posts
            .filter(post => !mockBlogPosts.some(m => m.slug === post.slug))
            .map((post) => ({
                slug: post.slug,
            }));
        return [...mockSlugs, ...firestoreSlugs];
    } catch (error) {
        console.error('Error generating static params, using mock data:', error);
        return mockSlugs;
    }
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    return <BlogDetailView slug={slug} />;
}
