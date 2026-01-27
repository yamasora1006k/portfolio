'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './worksListView.module.css';
import { Work } from './models/work';
import { Category } from './models/category';
import { fetchWorks } from './services/worksService';
import { fetchCategories } from './services/categoryService';

// カテゴリ用の雲形コンポーネント
function CategoryCloud({
    category,
    index,
    isActive,
    onHover,
    workCount,
}: {
    category: Category;
    index: number;
    isActive: boolean;
    onHover: (cat: Category | null) => void;
    workCount: number;
}) {
    // インデックスに基づいて雲の画像を切り替え（3種類をループ）
    const cloudImage = `/portfolio/assets/works/cloud_${(index % 3) + 1}.png`;

    return (
        <Link
            href={`/works/category/${category.slug}`}
            className={`${styles.categoryCloud} ${isActive ? styles.active : ''}`}
            onMouseEnter={() => onHover(category)}
            onMouseLeave={() => onHover(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={styles.cloudImageContainer}>
                <img
                    src={cloudImage}
                    alt="" // Decorative
                    className={styles.cloudImage}
                />
            </div>
            <span className={styles.categoryNumber}>0{index + 1}</span>
            <span className={styles.categoryText}>{category.name}</span>
            {workCount > 0 && (
                <span className={styles.workCount}>{workCount}</span>
            )}
        </Link>
    );
}

// ホバー時に表示する作品プレビュー（トランプ扇状配置）
function WorkPreview({
    works,
    isVisible
}: {
    works: Work[];
    isVisible: boolean;
}) {
    if (!isVisible || works.length === 0) return null;

    // ランダムにシャッフルして最大3枚選択
    const shuffled = [...works].sort(() => Math.random() - 0.5).slice(0, 3);
    const cardCount = shuffled.length;

    return (
        <div className={`${styles.previewContainer} ${isVisible ? styles.visible : ''}`}>
            {shuffled.map((work, idx) => {
                // トランプ扇状の配置計算（雲の後ろから出てくる）
                const middleIndex = (cardCount - 1) / 2;
                const offset = idx - middleIndex;
                const rotateAngle = offset * 12; // 各カード間の角度
                const xPercent = 50 + offset * 10; // 横方向のずれ
                const yPercent = 62 + Math.abs(offset) * 5; // 上に調整
                const zIndex = 1; // 雲より後ろに表示

                return (
                    <Link
                        key={work.id}
                        href={`/works/${work.slug}`}
                        className={styles.previewCard}
                        style={{
                            left: `${xPercent}%`,
                            top: `${yPercent}%`,
                            '--rotate': `${rotateAngle}deg`,
                            transformOrigin: 'center bottom',
                            zIndex: zIndex,
                            animationDelay: `${0.3 + idx * 0.1}s`, // 雲の後に表示
                        } as React.CSSProperties}
                    >
                        <div className={styles.previewImage}>
                            {work.thumbnail ? (
                                <img src={work.thumbnail} alt={work.title} className={styles.projectThumb} />
                            ) : (
                                <img
                                    src="/portfolio/assets/imgs/home/cloud.png"
                                    alt={work.title}
                                    className={styles.projectThumb}
                                />
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export function WorksListView() {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [works, setWorks] = useState<Work[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // データを読み込み
    useEffect(() => {
        async function loadData() {
            try {
                const [worksData, categoriesData] = await Promise.all([
                    fetchWorks(),
                    fetchCategories(),
                ]);
                setWorks(worksData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // カテゴリ内の作品数を取得
    const getWorkCount = (categoryId: string) => {
        return works.filter(w => w.categoryId === categoryId).length;
    };

    // アクティブなカテゴリの作品を取得
    const activeWorks = activeCategory
        ? works.filter(w => w.categoryId === activeCategory.id)
        : [];

    if (loading) {
        return (
            <div className={styles.worksPage}>
                <div className={styles.loading}>読み込み中...</div>
            </div>
        );
    }

    return (
        <div className={styles.worksPage}>
            {/* ヘッダー */}
            <header className={styles.header}>
                <h1 className={styles.title}>Works</h1>
                <h2 className={styles.archiveTitle}>Archive</h2>
            </header>

            {/* メインコンテンツ */}
            <div className={styles.content}>
                {/* 左カラム：カテゴリの雲 */}
                <nav className={styles.categories}>
                    {categories.map((category, idx) => (
                        <CategoryCloud
                            key={category.id}
                            category={category}
                            index={idx}
                            isActive={activeCategory?.id === category.id}
                            onHover={setActiveCategory}
                            workCount={getWorkCount(category.id)}
                        />
                    ))}
                </nav>

                {/* 右カラム：作品プレビュー */}
                <div className={styles.previews}>
                    <WorkPreview
                        works={activeWorks}
                        isVisible={activeCategory !== null}
                    />

                    {/* アクティブカテゴリのラベル */}
                    {activeCategory && (
                        <div className={styles.activeCategoryLabel}>
                            <span className={styles.labelNumber}>
                                0{categories.findIndex(c => c.id === activeCategory.id) + 1}
                            </span>
                            <span className={styles.labelText}>{activeCategory.name}</span>
                            {activeCategory.description && (
                                <span className={styles.labelDescription}>{activeCategory.description}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 全作品へのリンク */}
            <div className={styles.allWorksLink}>
                <Link href="/works/all" className={styles.viewAllButton}>
                    View All Works →
                </Link>
            </div>
        </div>
    );
}
