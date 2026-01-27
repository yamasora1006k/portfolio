import { mockWorks, fetchWorks } from '@/features/works/services/worksService';
import { WorkDetailClient } from './WorkDetailClient';

// 静的エクスポート時にダイナミックパラメータを無効化
export const dynamicParams = false;
interface Props {
    params: Promise<{ slug: string }>;
}

// すべての作品の静的パラメータを生成（モック + Firestore）
export async function generateStaticParams() {
    // モックデータのslugを取得
    const mockSlugs = mockWorks.map((work) => ({
        slug: work.slug,
    }));

    // Firestoreからも取得を試みる
    try {
        const firestoreWorks = await fetchWorks();
        const firestoreSlugs = firestoreWorks
            .filter(work => !mockWorks.some(m => m.slug === work.slug))
            .map((work) => ({
                slug: work.slug,
            }));
        return [...mockSlugs, ...firestoreSlugs];
    } catch {
        // Firestoreに接続できない場合はモックのみ返す
        return mockSlugs;
    }
}

export default async function WorkDetailPage({ params }: Props) {
    const { slug } = await params;
    return <WorkDetailClient slug={slug} />;
}
