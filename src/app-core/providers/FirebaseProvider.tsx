'use client';

import { useEffect } from 'react';
import { initializeAnalytics } from '@/lib/firebase';

/**
 * Firebase Analyticsを初期化するプロバイダー
 * クライアントサイドでのみ動作
 */
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Analyticsを初期化
        initializeAnalytics().then(analytics => {
            if (analytics) {
                console.log('Firebase Analytics initialized');
            }
        }).catch(error => {
            console.error('Failed to initialize Firebase Analytics:', error);
        });
    }, []);

    return <>{children}</>;
}
