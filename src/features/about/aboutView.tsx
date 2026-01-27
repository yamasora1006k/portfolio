'use client';

import { useState, useEffect } from 'react';
import styles from './aboutView.module.css';
import { AboutData } from './models/about';
import { fetchAboutData } from './services/aboutService';

export function AboutView() {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const aboutData = await fetchAboutData();
            setData(aboutData);
            setLoading(false);
        }
        load();
    }, []);

    if (loading || !data) {
        return (
            <div className={styles.aboutPage}>
                <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.aboutPage}>
            <div className="container">
                {/* ヘッダー */}
                <header className={styles.header}>
                    <h1 className="section-heading">
                        <span>About</span>
                    </h1>
                </header>

                {/* プロフィール */}
                <section className={styles.profile}>
                    <div className={styles.profileImage}>
                        {data.profileImage ? (
                            <img src={data.profileImage} alt={data.name} className={styles.profileImg} />
                        ) : (
                            <div className={styles.profileImagePlaceholder} />
                        )}
                    </div>

                    <div className={styles.profileContent}>
                        <h2 className={styles.name}>{data.name}</h2>
                        <p className={styles.role}>{data.role}</p>

                        <div className={styles.bio}>
                            {data.bio.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* スキル */}
                <section className={styles.skills}>
                    <h2 className="section-heading">
                        <span>Skills</span>
                    </h2>

                    <div className={styles.skillsGrid}>
                        {data.skills.map((skillGroup) => (
                            <div key={skillGroup.category} className={styles.skillGroup}>
                                <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                                <ul className={styles.skillList}>
                                    {skillGroup.items.map((skill) => (
                                        <li key={skill} className={styles.skillItem}>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 経歴 */}
                <section className={styles.experience}>
                    <h2 className="section-heading">
                        <span>Experience</span>
                    </h2>

                    <div className={styles.timeline}>
                        {data.experiences.map((exp, idx) => {
                            // 日付表示のフォーマット
                            const formatDate = (dateStr?: string) => {
                                if (!dateStr) return '現在';
                                const date = new Date(dateStr);
                                return `${date.getFullYear()}年${date.getMonth() + 1}月`;
                            };

                            const displayPeriod = exp.startDate
                                ? formatDate(exp.startDate)
                                : exp.period;

                            return (
                                <div key={idx} className={styles.timelineItem}>
                                    <span className={styles.timelinePeriod}>{displayPeriod}</span>
                                    <h3 className={styles.timelineTitle}>{exp.title}</h3>
                                    <p className={styles.timelineDescription}>{exp.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
