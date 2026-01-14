// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',          // 静的サイトを書き出す
  basePath: '/portfolio',    // Pagesのパスに合わせる
  assetPrefix: '/portfolio', // 静的ファイルの参照元を合わせる
  images: { unoptimized: true }, // next/image を静的書き出し対応にする
  trailingSlash: true,       // /page/ 形式でリンク切れを防ぐ
};

export default nextConfig;
