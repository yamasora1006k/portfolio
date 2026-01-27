'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Work } from '@/features/works/models/work';
import { Category } from '@/features/works/models/category';
import { fetchWorks } from '@/features/works/services/worksService';
import { fetchCategoryBySlug, fetchCategories } from '@/features/works/services/categoryService';
import styles from './categoryPage.module.css';

interface CategoryPageClientProps {
    slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
    const [category, setCategory] = useState<Category | null>(null);
    const [works, setWorks] = useState<Work[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [categoryData, worksData, categoriesData] = await Promise.all([
                    fetchCategoryBySlug(slug),
                    fetchWorks(),
                    fetchCategories(),
                ]);
                setCategory(categoryData);
                setCategories(categoriesData);
                // カテゴリに属する作品をフィルタ
                if (categoryData) {
                    setWorks(worksData.filter(w => w.categoryId === categoryData.id));
                }
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [slug]);

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>読み込み中...</div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h1>カテゴリが見つかりません</h1>
                    <Link href="/works" className={styles.backLink}>
                        ← Works に戻る
                    </Link>
                </div>
            </div>
        );
    }

    // 現在のカテゴリのインデックス
    const currentIndex = categories.findIndex(c => c.id === category.id);

    return (
        <div className={styles.page}>
            {/* ヘッダー */}
            <header className={styles.header}>
                <Link href="/works" className={styles.backLink}>
                    ← Works
                </Link>
                <div className={styles.titleArea}>
                    <span className={styles.categoryNumber}>0{currentIndex + 1}</span>
                    <h1 className={styles.title}>{category.name}</h1>
                </div>
                {category.description && (
                    <p className={styles.description}>{category.description}</p>
                )}
            </header>

            {/* 作品一覧 */}
            <section className={styles.worksSection}>
                {works.length > 0 ? (
                    <div className={styles.worksGrid}>
                        {works.map((work, index) => (
                            <Link
                                key={work.id}
                                href={`/works/${work.slug}`}
                                className={styles.workCard}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.cardImage}>
                                    {work.thumbnail ? (
                                        <img
                                            src={work.thumbnail}
                                            alt={work.title}
                                            className={styles.thumbnail}
                                        />
                                    ) : (
                                        <div className={styles.placeholderImage}>
                                            <span>{work.title}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.workTitle}>{work.title}</h3>
                                    <p className={styles.workDescription}>{work.description}</p>
                                    <div className={styles.workMeta}>
                                        <span className={styles.workYear}>
                                            {new Date(work.date || '').toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                                        </span>
                                        <div className={styles.workTechnologies}>
                                            {work.technologies.slice(0, 3).map(tech => (
                                                <span key={tech} className={styles.techBadge}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>このカテゴリにはまだ作品がありません</p>
                    </div>
                )}
            </section>

            {/* 他のカテゴリへのナビゲーション */}
            <nav className={styles.otherCategories}>
                <h2 className={styles.otherTitle}>Other Categories</h2>
                <div className={styles.categoryLinks}>
                    {categories
                        .filter(c => c.id !== category.id)
                        .map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/works/category/${cat.slug}`}
                                className={styles.categoryLink}
                            >
                                <span className={styles.categoryLinkNumber}>
                                    0{categories.findIndex(c => c.id === cat.id) + 1}
                                </span>
                                <span className={styles.categoryLinkName}>{cat.name}</span>
                            </Link>
                        ))}
                </div>
            </nav>
        </div>
    );
}
