'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkyBackground.module.css';
import { useSky } from '@/app-core/providers/ThemeProvider';
import { BASE_PATH } from '@/app-core/config/constants';

// 雲の形コンポーネント
function Cloud({
    x,
    y,
    opacity,
    speed,
    size = 'medium'
}: {
    x: number;
    y: number;
    opacity: number;
    speed: number;
    size?: 'small' | 'medium' | 'large';
}) {
    const sizeClass = styles[`cloud${size.charAt(0).toUpperCase() + size.slice(1)}`];

    // アニメーションの開始遅延と持続時間を計算
    // delayをマイナスに設定することで、アニメーションの途中から開始しているように見せる
    const animationStyle = {
        animationDuration: `${60 / speed}s`,
        animationDelay: `${-(x / 100) * (60 / speed)}s`, // X位置に基づいてアニメーションの時間をずらす
    };

    return (
        <div
            className={styles.cloudWrapper}
            style={{
                top: `${y}%`,
                left: 0, // アニメーションで移動するので左端基準
                opacity: opacity
            }}
        >
            <div className={styles.cloudMover} style={animationStyle}>
                <div className={`${styles.cloudScale} ${sizeClass}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`${BASE_PATH}/assets/imgs/home/cloud.png`}
                        alt=""
                        className={styles.cloudImage}
                    />
                </div>
            </div>
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

    // マウント時にランダムな雲を生成
    useEffect(() => {
        if (!skyState.theme.showClouds) {
            setClouds([]);
            return;
        }
        const numClouds = Math.floor(skyState.theme.cloudDensity / 15) + 3;
        const newClouds = Array.from({ length: numClouds }, (_, i) => ({
            id: i,
            x: Math.random() * 120 - 10, // シームレスに流れるよう -10% 〜 110%
            y: Math.random() * 60 + 5, // 上から5%〜65%の高さ
            size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
            speed: 0.5 + Math.random() * 1.5, // 速度にばらつきをつける
            opacity: 0.7 + Math.random() * 0.3,
        }));
        setClouds(newClouds);
    }, [skyState.theme.cloudDensity]);

    return (
        <div
            className={`${styles.skyBackground} ${isReady ? styles.ready : ''}`}
            aria-hidden="true"
        >
            {/* 空のグラデーション */}
            <div className={styles.skyGradient} />

            {/* 雲 */}
            <div className={styles.cloudsContainer}>
                {clouds.map((cloud) => (
                    <Cloud
                        key={cloud.id}
                        size={cloud.size}
                        x={cloud.x}
                        y={cloud.y}
                        opacity={cloud.opacity}
                        speed={cloud.speed}
                    />
                ))}
            </div>
        </div>
    );
}
