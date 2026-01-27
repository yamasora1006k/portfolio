'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostForm } from '@/features/admin/components/PostForm';
import { fetchBlogPostById, updateBlogPost } from '@/features/blog/services/blogService';
import { BlogPost } from '@/features/blog/models/blog';

export default function EditPostPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!id) {
                setLoading(false);
                return;
            }
            const data = await fetchBlogPostById(id);
            if (data) setPost(data);
            setLoading(false);
        }
        load();
    }, [id]);

    const handleUpdate = async (data: any) => {
        if (!id) return;
        await updateBlogPost(id, data);
    };

    if (!id) return <div style={{ color: '#fff', padding: '40px' }}>Missing post ID</div>;
    if (loading) return <div style={{ color: '#fff', padding: '40px' }}>Loading...</div>;
    if (!post) return <div style={{ color: '#fff', padding: '40px' }}>Post not found</div>;

    return (
        <div>
            <h1 style={{ color: '#fff', marginBottom: '2rem' }}>Edit Post</h1>
            <PostForm initialData={post} onSubmit={handleUpdate} />
        </div>
    );
}
