'use client';

import styles from './aboutView.module.css';

const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Vue.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Firebase'] },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'] },
    { category: 'Mobile', items: ['Flutter', 'React Native', 'Swift'] },
];

const experiences = [
    {
        period: '2023 - Present',
        title: 'Freelance Designer & Developer',
        description: 'Webデザイン・開発のフリーランスとして活動。',
    },
    {
        period: '2021 - 2023',
        title: 'Web Developer',
        description: 'フロントエンド開発を中心に、UI/UXデザインも担当。',
    },
];

export function AboutView() {
    return (
        <div className={styles.aboutPage}>
            <div className="container">
                {/* Header */}
                <header className={styles.header}>
                    <h1 className="section-heading">
                        <span>About</span>
                    </h1>
                </header>

                {/* Profile */}
                <section className={styles.profile}>
                    <div className={styles.profileImage}>
                        <div className={styles.profileImagePlaceholder} />
                    </div>

                    <div className={styles.profileContent}>
                        <h2 className={styles.name}>山口 空</h2>
                        <p className={styles.role}>Designer & Developer</p>

                        <div className={styles.bio}>
                            <p>
                                デザインと開発の両方のスキルを活かし、
                                ユーザー体験を大切にしたプロダクトを作っています。
                            </p>
                            <p>
                                「同じ空でも、見るたびに違う」——
                                このサイトのように、一面的ではない表現を通じて、
                                プロジェクトごとに最適な解決策を提案します。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section className={styles.skills}>
                    <h2 className="section-heading">
                        <span>Skills</span>
                    </h2>

                    <div className={styles.skillsGrid}>
                        {skills.map((skillGroup) => (
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

                {/* Experience */}
                <section className={styles.experience}>
                    <h2 className="section-heading">
                        <span>Experience</span>
                    </h2>

                    <div className={styles.timeline}>
                        {experiences.map((exp, idx) => (
                            <div key={idx} className={styles.timelineItem}>
                                <span className={styles.timelinePeriod}>{exp.period}</span>
                                <h3 className={styles.timelineTitle}>{exp.title}</h3>
                                <p className={styles.timelineDescription}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
