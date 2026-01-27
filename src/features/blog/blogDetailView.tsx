'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import { BlogPost } from './models/blog';
import { fetchBlogPostBySlug } from './services/blogService';
import styles from './blogDetailView.module.css';

interface Props {
    slug: string;
}

export function BlogDetailView({ slug }: Props) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchBlogPostBySlug(slug);
                setPost(data);
            } catch (error) {
                console.error('Failed to load blog post', error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    if (loading) {
        return <div className="loading">Reading atmosphere...</div>;
    }

    if (!post) {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <p>Article not found in the sky.</p>
                    <Link href="/blog">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/blog" className={styles.backLink}>
                ← Blog
            </Link>
            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.date}>{post.date}</span>
                        {post.category?.map(cat => (
                            <span key={cat} className={styles.category}>{cat}</span>
                        ))}
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                </header>

                {post.thumbnail && (
                    <div className={styles.thumbnailWrapper}>
                        <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
                    </div>
                )}

                <div className={styles.content}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
