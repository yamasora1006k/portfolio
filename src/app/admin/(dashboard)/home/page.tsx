'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/Input';
import { TextArea } from '@/shared/components/ui/TextArea';
import { Button } from '@/shared/components/ui/Button';
import { HomeData } from '@/features/home/models/home';
import { fetchHomeData, updateHomeData } from '@/features/home/services/homeService';

export default function HomeEditPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<HomeData>({
        heroSubtitle: '',
        heroTitleFirst: '',
        heroTitleLast: '',
        heroConceptText: '',
        aboutPreviewText: ''
    });

    useEffect(() => {
        async function load() {
            const data = await fetchHomeData();
            setFormData(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateHomeData(formData);
            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert('保存に失敗しました');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ color: '#fff', padding: '40px' }}>読み込み中...</div>;
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
                Home 編集
            </h1>

            {/* ヒーローセクション */}
            <section style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                    ヒーローセクション
                </h2>

                <div style={{ marginBottom: '16px' }}>
                    <Input
                        label="サブタイトル"
                        value={formData.heroSubtitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                        placeholder="Designer & Developer"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <Input
                        label="名前（ファーストネーム）"
                        value={formData.heroTitleFirst}
                        onChange={(e) => setFormData(prev => ({ ...prev, heroTitleFirst: e.target.value }))}
                        placeholder="Sora"
                    />
                    <Input
                        label="名前（ラストネーム）"
                        value={formData.heroTitleLast}
                        onChange={(e) => setFormData(prev => ({ ...prev, heroTitleLast: e.target.value }))}
                        placeholder="Yamaguchi"
                    />
                </div>

                <TextArea
                    label="コンセプトテキスト"
                    value={formData.heroConceptText}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroConceptText: e.target.value }))}
                    rows={3}
                    placeholder="空はいつも&#10;変わり続けます"
                />
            </section>

            {/* About プレビュー */}
            <section style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                    About プレビュー
                </h2>

                <TextArea
                    label="自己紹介文"
                    value={formData.aboutPreviewText}
                    onChange={(e) => setFormData(prev => ({ ...prev, aboutPreviewText: e.target.value }))}
                    rows={4}
                    placeholder="山口空です。&#10;デザインと開発の両方のスキルを活かし..."
                />
            </section>

            {/* 保存ボタン */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '40px' }}>
                <Button onClick={handleSave} loading={saving} size="lg">
                    変更を保存
                </Button>
            </div>
        </div>
    );
}
