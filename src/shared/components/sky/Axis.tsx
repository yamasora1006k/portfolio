'use client';

import { useEffect, useState } from 'react';
import styles from './Axis.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';

export function Axis() {
    const { skyState, isReady } = useSky();
    const [isHighlighting, setIsHighlighting] = useState(true);

    // Entry highlight animation
    useEffect(() => {
        if (isReady) {
            // Highlight on entry
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
            {/* Central vertical line */}
            <div className={styles.line} />

            {/* Glow effect */}
            <div className={styles.glow} />
        </div>
    );
}
