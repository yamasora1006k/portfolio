'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/Input';
import { TextArea } from '@/shared/components/ui/TextArea';
import { Button } from '@/shared/components/ui/Button';
import { AboutData, SkillGroup, Experience } from '@/features/about/models/about';
import { fetchAboutData, updateAboutData, uploadProfileImage } from '@/features/about/services/aboutService';

export default function AboutEditPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<AboutData>({
        name: '',
        role: '',
        bio: ['', ''],
        skills: [],
        experiences: []
    });

    useEffect(() => {
        async function load() {
            const data = await fetchAboutData();
            setFormData(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateAboutData(formData);
            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert('保存に失敗しました');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadProfileImage(file);
            setFormData(prev => ({ ...prev, profileImage: url }));
        } catch (error) {
            console.error(error);
            alert('画像のアップロードに失敗しました');
        } finally {
            setUploading(false);
        }
    };

    // スキルグループ追加
    const addSkillGroup = () => {
        setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, { category: '', items: [] }]
        }));
    };

    // スキルグループ削除
    const removeSkillGroup = (index: number) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    // スキルグループ更新
    const updateSkillGroup = (index: number, field: keyof SkillGroup, value: any) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.map((s, i) => i === index ? { ...s, [field]: value } : s)
        }));
    };

    // 経歴追加
    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { period: '', title: '', description: '' }]
        }));
    };

    // 経歴削除
    const removeExperience = (index: number) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    // 経歴更新
    const updateExperience = (index: number, field: keyof Experience, value: string) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.map((e, i) => i === index ? { ...e, [field]: value } : e)
        }));
    };

    if (loading) {
        return <div style={{ color: '#fff', padding: '40px' }}>読み込み中...</div>;
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
                About 編集
            </h1>

            {/* プロフィール */}
            <section style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                    プロフィール
                </h2>

                {/* プロフィール画像 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>
                        プロフィール画像
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: formData.profileImage ? `url(${formData.profileImage}) center/cover` : 'linear-gradient(135deg, #e0f0f8, #c8e4f0)',
                            border: '3px solid #475569'
                        }} />
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                loading={uploading}
                            >
                                {uploading ? 'アップロード中...' : '画像を選択'}
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <Input
                        label="名前"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                        label="肩書き"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    />
                </div>
                <TextArea
                    label="自己紹介（1段落目）"
                    value={formData.bio[0] || ''}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bio: [e.target.value, prev.bio[1] || '']
                    }))}
                    rows={3}
                />
                <div style={{ marginTop: '12px' }}>
                    <TextArea
                        label="自己紹介（2段落目）"
                        value={formData.bio[1] || ''}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            bio: [prev.bio[0] || '', e.target.value]
                        }))}
                        rows={3}
                    />
                </div>
            </section>

            {/* スキル */}
            <section style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>
                        スキル
                    </h2>
                    <Button type="button" variant="secondary" size="sm" onClick={addSkillGroup}>
                        + カテゴリを追加
                    </Button>
                </div>

                {formData.skills.map((skill, idx) => (
                    <div key={idx} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    label="カテゴリ名"
                                    value={skill.category}
                                    onChange={(e) => updateSkillGroup(idx, 'category', e.target.value)}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSkillGroup(idx)}
                                style={{ color: '#ef4444', marginTop: '24px' }}
                            >
                                削除
                            </Button>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <Input
                                label="スキル（カンマ区切り）"
                                value={skill.items.join(', ')}
                                onChange={(e) => updateSkillGroup(idx, 'items', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                placeholder="React, Next.js, TypeScript"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* 経歴 */}
            <section style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>
                        経歴
                    </h2>
                    <Button type="button" variant="secondary" size="sm" onClick={addExperience}>
                        + 経歴を追加
                    </Button>
                </div>

                {formData.experiences.map((exp, idx) => (
                    <div key={idx} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ flex: 2 }}>
                                <Input
                                    label="役職・タイトル"
                                    value={exp.title}
                                    onChange={(e) => updateExperience(idx, 'title', e.target.value)}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExperience(idx)}
                                style={{ color: '#ef4444', marginTop: '24px' }}
                            >
                                削除
                            </Button>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <Input
                                label="開始日"
                                type="date"
                                value={exp.startDate || ''}
                                onChange={(e) => updateExperience(idx, 'startDate', e.target.value)}
                            />
                        </div>
                        <Input
                            label="表示テキスト（例: 2023年4月 - 現在）"
                            value={exp.period}
                            onChange={(e) => updateExperience(idx, 'period', e.target.value)}
                            placeholder="2023年4月 - 現在"
                        />
                        <div style={{ marginTop: '12px' }}>
                            <Input
                                label="説明"
                                value={exp.description}
                                onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
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
