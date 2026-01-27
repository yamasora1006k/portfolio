'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { NAV_LINKS } from '@/app-core/config/constants';

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // ヘッダー背景のスクロール処理
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ルートが変わったらメニューを閉じる
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        >
            <div className={styles.container}>
                {/* ロゴ（中央配置） */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>Sora Studio</span>
                </Link>

                {/* デスクトップナビゲーション */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navList}>
                        {NAV_LINKS.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''
                                        }`}
                                >
                                    <span className={styles.navLinkText}>{link.label}</span>
                                    {/* 対称下線 */}
                                    <span className={styles.navLinkUnderline} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* モバイルメニューボタン */}
                <button
                    className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    <span className={styles.menuLine} />
                    <span className={styles.menuLine} />
                    <span className={styles.menuLine} />
                </button>
            </div>

            {/* モバイルナビゲーション */}
            <nav
                className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}
                aria-hidden={!isMenuOpen}
            >
                <ul className={styles.mobileNavList}>
                    {NAV_LINKS.map((link, index) => (
                        <li
                            key={link.href}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <Link
                                href={link.href}
                                className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''
                                    }`}
                                tabIndex={isMenuOpen ? 0 : -1}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
