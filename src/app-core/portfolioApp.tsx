'use client';

import { Suspense, ReactNode } from 'react';
import { SkyProvider } from '@/app-core/providers/ThemeProvider';

interface PortfolioAppProps {
    children: ReactNode;
}

// searchParams を使う内側コンポーネント
function PortfolioAppInner({ children }: PortfolioAppProps) {
    return (
        <SkyProvider>
            {children}
        </SkyProvider>
    );
}

// searchParams用に Suspense を挟んだアプリ全体のラッパー
export function PortfolioApp({ children }: PortfolioAppProps) {
    return (
        <Suspense fallback={<div className="app-loading" />}>
            <PortfolioAppInner>
                {children}
            </PortfolioAppInner>
        </Suspense>
    );
}
