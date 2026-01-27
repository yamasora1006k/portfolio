'use client';

import { PostForm } from '@/features/admin/components/PostForm';
import { createBlogPost } from '@/features/blog/services/blogService';

export default function NewPostPage() {
    const handleCreate = async (data: any) => {
        await createBlogPost(data);
    };

    return (
        <div>
            <h1 style={{ color: '#fff', marginBottom: '2rem' }}>Create New Post</h1>
            <PostForm onSubmit={handleCreate} />
        </div>
    );
}
