'use client';

import { useEffect, useState } from 'react';
import styles from './Axis.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';

export function Axis() {
    const { skyState, isReady } = useSky();
    const [isHighlighting, setIsHighlighting] = useState(true);

    // 入場時のハイライトアニメーション
    useEffect(() => {
        if (isReady) {
            // 表示開始時にハイライト
            setIsHighlighting(true);

            const timer = setTimeout(() => {
                setIsHighlighting(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isReady]);

    return (
        <div
            className={`${styles.axis} ${isReady ? styles.ready : ''} ${isHighlighting ? styles.highlighting : ''
                }`}
            style={{
                opacity: skyState.theme.axisVisibility / 100,
            }}
            aria-hidden="true"
        >
            {/* 中央の縦ライン */}
            <div className={styles.line} />

            {/* グローエフェクト */}
            <div className={styles.glow} />
        </div>
    );
}
