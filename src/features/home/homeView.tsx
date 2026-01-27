'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './homeView.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';
import { Work } from '@/features/works/models/work';
import { fetchWorks } from '@/features/works/services/worksService';
import { BlogPost } from '@/features/blog/models/blog';
import { fetchBlogPosts } from '@/features/blog/services/blogService';
import { HomeData } from './models/home';
import { fetchHomeData } from './services/homeService';


export function HomeView() {
    const { isReady } = useSky();
    const [randomWorks, setRandomWorks] = useState<Work[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [homeData, setHomeData] = useState<HomeData | null>(null);

    useEffect(() => {
        async function loadData() {
            const [worksData, blogData, homeContent] = await Promise.all([
                fetchWorks(),
                fetchBlogPosts(),
                fetchHomeData()
            ]);
            // ランダムにシャッフルして3つ選択
            const shuffledWorks = [...worksData].sort(() => Math.random() - 0.5).slice(0, 3);
            setRandomWorks(shuffledWorks);
            setBlogPosts(blogData);
            setHomeData(homeContent);
        }
        loadData();
    }, []);

    // テキストを改行で分割してJSXに変換
    const renderWithLineBreaks = (text: string) => {
        return text.split('\n').map((line, i, arr) => (
            <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className={`${styles.home} ${isReady ? styles.ready : ''}`}>
            {/* ヒーローセクション */}
            <section className={styles.hero}>
                {/* 背景の動的要素（光や空気感） */}
                <div className={styles.ambientLayer}>
                    <div className={styles.lightOrb} />
                    <div className={styles.lightOrbSecondary} />
                </div>

                <div className={styles.heroLayout}>
                    {/* メインタイトルエリア */}
                    <div className={styles.mainContent}>
                        <p className={styles.subtitle}>
                            {homeData?.heroSubtitle || 'Designer & Developer'}
                        </p>

                        <h1 className={styles.title}>
                            <span className={styles.titleLine}>{homeData?.heroTitleFirst || 'Sora'}</span>
                            <span className={styles.titleWord}>{homeData?.heroTitleLast || 'Yamaguchi'}</span>
                        </h1>

                        <div className={styles.ctaWrapper}>
                            <Link href="/works" className={styles.ctaButton}>
                                <span className={styles.ctaText}>View Works</span>
                                <span className={styles.ctaIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* コンセプトテキスト（少し離れた位置に配置） */}
                    <div className={styles.conceptArea}>
                        <p className={styles.concept}>
                            {homeData?.heroConceptText
                                ? renderWithLineBreaks(homeData.heroConceptText)
                                : <>空はいつも<br />変わり続けます</>
                            }
                        </p>
                    </div>
                </div>

                {/* スクロールインジケーター */}
                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollLine} />
                    <span className={styles.scrollText}>Scroll to Explore</span>
                </div>
            </section>

            {/* 自己紹介のプレビュー */}
            <section className={styles.aboutPreview}>
                <div className="container">
                    <div className={styles.aboutContent}>
                        <h2 className="section-heading">
                            <span>About Me</span>
                        </h2>

                        <p className={styles.aboutText}>
                            {homeData?.aboutPreviewText
                                ? renderWithLineBreaks(homeData.aboutPreviewText)
                                : <>山口空です。<br />デザインと開発の両方のスキルを活かし、<br />ユーザー体験を大切にしたプロダクトを作っています。</>
                            }
                        </p>

                        <Link href="/about" className={styles.aboutLink}>
                            More About Me
                            <span className={styles.aboutArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 注目作品プレビュー */}
            <section className={styles.featured}>
                <div className="container">
                    <h2 className="section-heading">
                        <span>Sora&apos;s Works</span>
                    </h2>

                    <div className={styles.featuredGrid}>
                        {randomWorks.map((work) => (
                            <Link
                                key={work.id}
                                href={`/works/${work.slug}`}
                                className={styles.featuredCard}
                            >
                                <div className={styles.cardImage}>
                                    {work.thumbnail ? (
                                        <img
                                            src={work.thumbnail}
                                            alt={work.title}
                                            className={styles.cardImg}
                                        />
                                    ) : (
                                        <div className={styles.cardImagePlaceholder} />
                                    )}
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3 className={styles.cardTitle}>{work.title}</h3>
                                    <p className={styles.cardCategory}>{work.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.viewAll}>
                        <Link href="/works" className={styles.viewAllLink}>
                            View All Works
                            <span className={styles.viewAllArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ブログセクション */}
            <section className={styles.blog}>
                <div className="container">
                    <h2 className="section-heading">
                        <span>Articles</span>
                    </h2>

                    <div className={styles.blogGrid}>
                        {blogPosts.map(post => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className={styles.blogCard}>
                                <div className={styles.blogInfo}>
                                    <div className={styles.blogDate}>{post.date}</div>
                                    <h3 className={styles.blogTitle}>{post.title}</h3>
                                    <div className={styles.blogCategories}>
                                        {post.category?.map(cat => (
                                            <span key={cat} className={styles.blogCategory}>{cat}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.viewAll}>
                        <Link href="/blog" className={styles.viewAllLink}>
                            View All Articles
                            <span className={styles.viewAllArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
