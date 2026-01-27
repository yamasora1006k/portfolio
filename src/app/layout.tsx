import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { PortfolioApp } from "@/app-core/portfolioApp";
import { FirebaseProvider } from "@/app-core/providers/FirebaseProvider";
import ClientLayout from "./ClientLayout";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sora Studio – Sora Yamaguchi Portfolio",
  description: "同じ空でも、見るたびに違う。山口空のポートフォリオサイト。",
  keywords: ["portfolio", "web development", "design", "Sora Yamaguchi", "山口空"],
  authors: [{ name: "Sora Yamaguchi" }],
  openGraph: {
    title: "Sora Studio – Sora Yamaguchi Portfolio",
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
      <body className={notoSansJP.variable}>
        <PortfolioApp>
          <FirebaseProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </FirebaseProvider>
        </PortfolioApp>
      </body>
    </html>
  );
}
