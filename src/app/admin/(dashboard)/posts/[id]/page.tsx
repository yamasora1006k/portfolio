import { fetchAllBlogPosts } from '@/features/blog/services/blogService';
import { EditPostClient } from './EditPostClient';

export async function generateStaticParams() {
    const posts = await fetchAllBlogPosts();
    return posts.map((post) => ({
        id: post.id,
    }));
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    return <EditPostClient id={id} />;
}
