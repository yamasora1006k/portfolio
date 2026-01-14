import { notFound } from 'next/navigation';
import { WorkDetailView } from '@/features/works/workDetailView';
import { mockWorks } from '@/features/works/services/worksService';

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static params for all works
export async function generateStaticParams() {
    return mockWorks.map((work) => ({
        slug: work.slug,
    }));
}

export default async function WorkDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const work = mockWorks.find((w) => w.slug === resolvedParams.slug);

    if (!work) {
        notFound();
    }

    return <WorkDetailView work={work} />;
}
