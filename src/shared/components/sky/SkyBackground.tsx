'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkyBackground.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';

// Cloud shape component
function Cloud({ style, size = 'medium' }: { style?: React.CSSProperties; size?: 'small' | 'medium' | 'large' }) {
    const sizeClass = styles[`cloud${size.charAt(0).toUpperCase() + size.slice(1)}`];
    return (
        <div className={`${styles.cloud} ${sizeClass}`} style={style}>
            <div className={styles.cloudBubble1} />
            <div className={styles.cloudBubble2} />
            <div className={styles.cloudBubble3} />
            <div className={styles.cloudBubble4} />
            <div className={styles.cloudBase} />
        </div>
    );
}

export function SkyBackground() {
    const { skyState, isReady } = useSky();
    const [clouds, setClouds] = useState<Array<{
        id: number;
        x: number;
        y: number;
        size: 'small' | 'medium' | 'large';
        speed: number;
        opacity: number;
    }>>([]);

    // Generate random clouds on mount
    useEffect(() => {
        const numClouds = Math.floor(skyState.theme.cloudDensity / 15) + 3;
        const newClouds = Array.from({ length: numClouds }, (_, i) => ({
            id: i,
            x: Math.random() * 120 - 10, // -10% to 110% for seamless scroll
            y: Math.random() * 60 + 5, // 5% to 65% from top
            size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
            speed: 0.5 + Math.random() * 1.5, // Varying speeds
            opacity: 0.7 + Math.random() * 0.3,
        }));
        setClouds(newClouds);
    }, [skyState.theme.cloudDensity]);

    return (
        <div
            className={`${styles.skyBackground} ${isReady ? styles.ready : ''}`}
            aria-hidden="true"
        >
            {/* Sky gradient */}
            <div className={styles.skyGradient} />

            {/* Clouds */}
            <div className={styles.cloudsContainer}>
                {clouds.map((cloud) => (
                    <Cloud
                        key={cloud.id}
                        size={cloud.size}
                        style={{
                            left: `${cloud.x}%`,
                            top: `${cloud.y}%`,
                            opacity: cloud.opacity,
                            animationDuration: `${60 / cloud.speed}s`,
                            animationDelay: `${-cloud.x / 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
