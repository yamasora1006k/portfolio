import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Symmetric decorative line */}
                <div className={styles.decorativeLine}>
                    <span className={styles.lineLeft} />
                    <span className={styles.lineDot} />
                    <span className={styles.lineRight} />
                </div>

                {/* Main content */}
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            SKY VARIANTS
                        </Link>
                        <p className={styles.tagline}>
                            同じ空でも、見るたびに違う。
                        </p>
                    </div>

                    <nav className={styles.links}>
                        <Link href="/works" className={styles.link}>Works</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                    </nav>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>© {currentYear} Sora Yamaguchi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
