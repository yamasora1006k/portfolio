'use client';

import { useState, useEffect } from 'react';
import { PostForm } from '@/features/admin/components/PostForm';
import { fetchBlogPostById, updateBlogPost } from '@/features/blog/services/blogService';
import { BlogPost } from '@/features/blog/models/blog';

interface EditPostClientProps {
    id: string;
}

export function EditPostClient({ id }: EditPostClientProps) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchBlogPostById(id);
            if (data) setPost(data);
            setLoading(false);
        }
        load();
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updateBlogPost(id, data);
    };

    if (loading) return <div style={{ color: '#fff' }}>Loading...</div>;
    if (!post) return <div style={{ color: '#fff' }}>Post not found</div>;

    return (
        <div>
            <h1 style={{ color: '#fff', marginBottom: '2rem' }}>Edit Post</h1>
            <PostForm initialData={post} onSubmit={handleUpdate} />
        </div>
    );
}
