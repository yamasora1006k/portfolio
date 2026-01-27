'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Work } from '@/features/works/models/work';
import { fetchWorks } from '@/features/works/services/worksService';
import styles from './allWorks.module.css';

export function AllWorksClient() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWorks() {
            try {
                const data = await fetchWorks();
                // Client-side sort by date descending
                const sorted = data.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                setWorks(sorted);
            } catch (error) {
                console.error('Failed to load works:', error);
            } finally {
                setLoading(false);
            }
        }
        loadWorks();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/works" className={styles.backLink}>
                    ← Works
                </Link>
                <h1 className={styles.title}>All Works</h1>
            </header>

            <div className={styles.grid}>
                {works.map((work) => (
                    <Link key={work.id} href={`/works/${work.slug}`} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {work.thumbnail ? (
                                <img src={work.thumbnail} alt={work.title} className={styles.image} />
                            ) : (
                                <div className={styles.placeholder} />
                            )}
                        </div>
                        <div className={styles.info}>
                            <h2 className={styles.workTitle}>{work.title}</h2>
                            <p className={styles.workCategory}>{work.category || 'Unknown Category'}</p>
                            <span className={styles.year}>
                                {new Date(work.date || '').toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
