'use client';

import Link from 'next/link';
import styles from './homeView.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';

export function HomeView() {
    const { isReady } = useSky();

    return (
        <div className={`${styles.home} ${isReady ? styles.ready : ''}`}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleLine}>Sora</span>
                        <span className={styles.titleLine}>Yamaguchi</span>
                    </h1>

                    <p className={styles.subtitle}>
                        Designer & Developer
                    </p>

                    <p className={styles.concept}>
                        同じ空でも、見るたびに違う。
                    </p>

                    <div className={styles.cta}>
                        <Link href="/works" className={styles.ctaButton}>
                            View Works
                            <span className={styles.ctaArrow}>→</span>
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>Scroll</span>
                    <span className={styles.scrollLine} />
                </div>
            </section>

            {/* Featured Works Preview */}
            <section className={styles.featured}>
                <div className="container">
                    <h2 className="section-heading">
                        <span>Featured Works</span>
                    </h2>

                    <div className={styles.featuredGrid}>
                        {/* Placeholder cards - will be replaced with CMS data */}
                        {[1, 2, 3].map((i) => (
                            <Link
                                key={i}
                                href={`/works/project-${i}`}
                                className={styles.featuredCard}
                            >
                                <div className={styles.cardImage}>
                                    <div className={styles.cardImagePlaceholder} />
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3 className={styles.cardTitle}>Project {i}</h3>
                                    <p className={styles.cardCategory}>Web Design / Development</p>
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

            {/* About Preview */}
            <section className={styles.aboutPreview}>
                <div className="container">
                    <div className={styles.aboutContent}>
                        <h2 className="section-heading">
                            <span>About</span>
                        </h2>

                        <p className={styles.aboutText}>
                            山口空です。デザインと開発の両方のスキルを活かし、
                            ユーザー体験を大切にしたプロダクトを作っています。
                        </p>

                        <Link href="/about" className={styles.aboutLink}>
                            More About Me
                            <span className={styles.aboutArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
