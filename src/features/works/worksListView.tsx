'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './worksListView.module.css';
import { Work } from './models/work';
import { mockWorks, getCategories } from './services/worksService';

// Cloud shape component for category
function CategoryCloud({
    category,
    index,
    isActive,
    onHover
}: {
    category: string;
    index: number;
    isActive: boolean;
    onHover: (cat: string | null) => void;
}) {
    return (
        <div
            className={`${styles.categoryCloud} ${isActive ? styles.active : ''}`}
            onMouseEnter={() => onHover(category)}
            onMouseLeave={() => onHover(null)}
        >
            <div className={styles.cloudShape}>
                <div className={styles.cloudBubble1} />
                <div className={styles.cloudBubble2} />
                <div className={styles.cloudBubble3} />
                <div className={styles.cloudBase} />
            </div>
            <span className={styles.categoryNumber}>0{index + 1}</span>
            <span className={styles.categoryText}>{category}</span>
        </div>
    );
}

// Work preview that appears on hover
function WorkPreview({
    works,
    isVisible
}: {
    works: Work[];
    isVisible: boolean;
}) {
    if (!isVisible || works.length === 0) return null;

    return (
        <div className={`${styles.previewContainer} ${isVisible ? styles.visible : ''}`}>
            {works.slice(0, 4).map((work, idx) => (
                <Link
                    key={work.id}
                    href={`/works/${work.slug}`}
                    className={styles.previewCard}
                    style={{
                        transform: `rotate(${-15 + idx * 10}deg) translateX(${idx * 40}px)`,
                        zIndex: 4 - idx,
                        animationDelay: `${idx * 0.1}s`,
                    }}
                >
                    <div className={styles.previewImage}>
                        <div className={styles.previewImagePlaceholder}>
                            <span className={styles.projectTitle}>{work.title}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export function WorksListView() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [works] = useState<Work[]>(mockWorks);

    // Get unique categories
    const categories = getCategories(works);

    // Get works for active category
    const activeWorks = activeCategory
        ? works.filter(w => w.category === activeCategory)
        : [];

    return (
        <div className={styles.worksPage}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>Works</h1>
                <h2 className={styles.archiveTitle}>Archive</h2>
            </header>

            {/* Main content */}
            <div className={styles.content}>
                {/* Left side - Category clouds */}
                <nav className={styles.categories}>
                    {categories.map((category, idx) => (
                        <CategoryCloud
                            key={category}
                            category={category}
                            index={idx}
                            isActive={activeCategory === category}
                            onHover={setActiveCategory}
                        />
                    ))}
                </nav>

                {/* Right side - Work previews */}
                <div className={styles.previews}>
                    <WorkPreview
                        works={activeWorks}
                        isVisible={activeCategory !== null}
                    />

                    {/* Active category label */}
                    {activeCategory && (
                        <div className={styles.activeCategoryLabel}>
                            <span className={styles.labelNumber}>
                                0{categories.indexOf(activeCategory) + 1}
                            </span>
                            <span className={styles.labelText}>{activeCategory}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* All works link */}
            <div className={styles.allWorksLink}>
                <Link href="/works/all" className={styles.viewAllButton}>
                    View All Works →
                </Link>
            </div>
        </div>
    );
}
