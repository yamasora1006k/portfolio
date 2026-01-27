'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from './models/blog';
import { fetchBlogPosts } from './services/blogService';
import styles from './blogListView.module.css';

export function BlogListView() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchBlogPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to load blog posts', error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return <div className="loading">Cannot check atmosphere...</div>;
    }

    return (
        <div className="container">
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Blog</h1>
                </header>

                <div className={styles.grid}>
                    {posts.map(post => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                            <div className={styles.date}>{post.date}</div>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            <p className={styles.excerpt}>{post.excerpt}</p>

                            <div className={styles.categories}>
                                {post.category?.map(cat => (
                                    <span key={cat} className={styles.category}>{cat}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
