'use client';

import Link from 'next/link';
import styles from './workDetailView.module.css';
import { Work } from './models/work';

interface WorkDetailViewProps {
    work: Work;
}

function DetailSection({
    title,
    content
}: {
    title: string;
    content?: string;
}) {
    if (!content) return null;

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <p className={styles.sectionContent}>{content}</p>
        </div>
    );
}

export function WorkDetailView({ work }: WorkDetailViewProps) {
    // カテゴリに基づいた戻り先を生成
    const getCategorySlug = () => {
        // categoryIdからスラッグを推測（programming, design, other）
        const categoryMap: Record<string, string> = {
            '1': 'programming',
            '2': 'design',
            '3': 'other',
        };
        return categoryMap[work.categoryId] || 'programming';
    };

    return (
        <div className={styles.detailPage}>
            {/* 戻るリンク - カテゴリページへ */}
            <Link href={`/works/category/${getCategorySlug()}`} className={styles.backLink}>
                <span className={styles.backArrow}>←</span>
                {work.category}
            </Link>

            {/* メインコンテンツ - 2カラムレイアウト */}
            <div className={styles.mainContent}>
                {/* 左カラム：画像 */}
                <div className={styles.imageColumn}>
                    <div className={styles.heroImage}>
                        {work.thumbnail ? (
                            <img
                                src={work.thumbnail}
                                alt={work.title}
                                className={styles.heroImg}
                            />
                        ) : (
                            <div className={styles.heroImagePlaceholder}>
                                <span>{work.title}</span>
                            </div>
                        )}
                    </div>

                    {/* 追加画像 */}
                    {work.images && work.images.length > 0 && (
                        <div className={styles.gallery}>
                            {work.images.map((img, idx) => (
                                <div key={idx} className={styles.galleryItem}>
                                    <img src={img} alt={`${work.title} ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 右カラム：コンテンツ */}
                <div className={styles.contentColumn}>
                    {/* ヘッダー */}
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <span className={styles.category}>{work.category}</span>
                            <span className={styles.year}>
                                {new Date(work.date || '').toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                            </span>
                        </div>
                        <h1 className={styles.title}>{work.title}</h1>
                        <p className={styles.description}>{work.description}</p>
                    </header>

                    {/* タグ */}
                    <div className={styles.tags}>
                        {work.technologies.map((tech) => (
                            <span key={tech} className={styles.tag}>{tech}</span>
                        ))}
                    </div>

                    {/* リンク */}
                    <div className={styles.links}>
                        {work.liveUrl && (
                            <a
                                href={work.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkButton}
                            >
                                View Live →
                            </a>
                        )}
                        {work.githubUrl && (
                            <a
                                href={work.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkButtonOutline}
                            >
                                GitHub
                            </a>
                        )}
                    </div>

                    {/* 詳細セクション */}
                    <div className={styles.details}>
                        <DetailSection title="背景・理由" content={work.background} />
                        <DetailSection title="課題" content={work.challenge} />
                        <DetailSection title="役割" content={work.role} />
                        <DetailSection title="プロセス" content={work.process} />
                        <DetailSection title="実装" content={work.implementation} />
                        <DetailSection title="成果" content={work.outcome} />
                        <DetailSection title="学び" content={work.lessons} />
                    </div>
                </div>
            </div>

            {/* ナビゲーション */}
            <nav className={styles.navigation}>
                <Link href="/works" className={styles.navLink}>
                    ← View All Works
                </Link>
            </nav>
        </div>
    );
}
