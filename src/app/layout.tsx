import type { Metadata } from "next";
import "@/styles/globals.css";
import { PortfolioApp } from "@/app-core/portfolioApp";
import { SkyBackground } from "@/shared/components/sky/SkyBackground";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";

export const metadata: Metadata = {
  title: "SKY VARIANTS – Sora Yamaguchi Portfolio",
  description: "同じ空でも、見るたびに違う。山口空のポートフォリオサイト。",
  keywords: ["portfolio", "web development", "design", "Sora Yamaguchi", "山口空"],
  authors: [{ name: "Sora Yamaguchi" }],
  openGraph: {
    title: "SKY VARIANTS – Sora Yamaguchi Portfolio",
    description: "同じ空でも、見るたびに違う。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <PortfolioApp>
          {/* Sky background */}
          <SkyBackground />

          {/* Main content */}
          <div className="main-content">
            <Header />
            <main className="page">
              {children}
            </main>
            <Footer />
          </div>
        </PortfolioApp>
      </body>
    </html>
  );
}
