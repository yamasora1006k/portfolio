'use client';

import { usePathname } from 'next/navigation';
import { SkyBackground } from "@/shared/components/sky/SkyBackground";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { ScrollToTop } from "@/shared/components/utils/ScrollToTop";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // basePath is /portfolio, so pathname for admin is likely /admin or /portfolio/admin depending on internal routing.
    // We check both just to be safe, or start with /admin which is the standard next.js behavior.
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            {/* 空の背景 */}
            <SkyBackground />
            <ScrollToTop />

            {/* メインコンテンツ */}
            <div className="main-content">
                <Header />
                <main className="page">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
