'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WorkDetailView } from '@/features/works/workDetailView';
import { Work } from '@/features/works/models/work';
import { fetchWorkBySlug } from '@/features/works/services/worksService';

interface Props {
    slug: string;
}

export function WorkDetailClient({ slug }: Props) {
    const [work, setWork] = useState<Work | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadWork() {
            try {
                const data = await fetchWorkBySlug(slug);
                if (data) {
                    setWork(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to load work:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadWork();
    }, [slug]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                color: 'var(--sky-text-secondary)'
            }}>
                読み込み中...
            </div>
        );
    }

    if (error || !work) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                color: 'var(--sky-text-secondary)',
                gap: '1rem'
            }}>
                <p>作品が見つかりません</p>
                <Link href="/works" style={{ color: 'var(--sky-accent)', textDecoration: 'none' }}>
                    ← Works に戻る
                </Link>
            </div>
        );
    }

    return <WorkDetailView work={work} />;
}
