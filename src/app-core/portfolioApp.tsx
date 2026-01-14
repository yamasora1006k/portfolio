'use client';

import { Suspense, ReactNode } from 'react';
import { SkyProvider } from '@/app-core/providers/ThemeProvider';

interface PortfolioAppProps {
    children: ReactNode;
}

// Inner component that uses searchParams
function PortfolioAppInner({ children }: PortfolioAppProps) {
    return (
        <SkyProvider>
            {children}
        </SkyProvider>
    );
}

// Main app wrapper with Suspense for searchParams
export function PortfolioApp({ children }: PortfolioAppProps) {
    return (
        <Suspense fallback={<div className="app-loading" />}>
            <PortfolioAppInner>
                {children}
            </PortfolioAppInner>
        </Suspense>
    );
}
