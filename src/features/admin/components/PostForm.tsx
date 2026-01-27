'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/features/blog/models/blog';
import { uploadBlogImage } from '@/features/blog/services/blogService';
import { Input } from '@/shared/components/ui/Input';
import { TextArea } from '@/shared/components/ui/TextArea';
import { Button } from '@/shared/components/ui/Button';
import { ImageUpload } from '@/shared/components/admin/ImageUpload';
import ReactMarkdown from 'react-markdown';
import styles from './PostForm.module.css';

interface Props {
    initialData?: Partial<BlogPost>;
    onSubmit: (data: any) => Promise<void>;
}

export function PostForm({ initialData, onSubmit }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        published: initialData?.published || false,
        category: initialData?.category?.join(', ') || '',
        thumbnail: initialData?.thumbnail || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = {
                ...formData,
                // Replace dots with hyphens for standard date format if needed, 
                // but let's keep consistency with the input value
                category: formData.category.split(',').map(c => c.trim()).filter(Boolean)
            };

            await onSubmit(submitData);
            router.push('/admin');
        } catch (error: any) {
            console.error('Failed to save post:', error);
            alert(`保存に失敗しました。\nError: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                    {initialData ? '記事の編集' : '新規記事の作成'}
                </h1>
                <p style={{ color: '#64748b' }}>
                    ブログ記事を作成・編集します。Markdown記法が使用可能です。
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <Input
                        label="タイトル *"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="記事のタイトルを入力"
                    />
                    <Input
                        label="スラッグ (URL用) *"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        placeholder="例: new-feature-release"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <Input
                        label="公開日"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="カテゴリ (カンマ区切り)"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Design, Tech, Life"
                    />
                </div>

                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>
                        サムネイル画像
                    </label>
                    <ImageUpload
                        value={formData.thumbnail}
                        onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                        onUpload={uploadBlogImage}
                    />
                </div>

                <TextArea
                    label="抜粋 (一覧表示用)"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    placeholder="記事の概要を短く入力しました"
                />

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>本文 (Markdown)</label>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setPreviewMode(!previewMode)}
                        >
                            {previewMode ? '編集モードに戻る' : 'プレビューを表示'}
                        </Button>
                    </div>

                    {previewMode ? (
                        <div style={{
                            padding: '24px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            minHeight: '400px',
                            background: '#ffffff',
                            lineHeight: '1.7',
                            color: '#334155'
                        }}>
                            <ReactMarkdown>{formData.content}</ReactMarkdown>
                        </div>
                    ) : (
                        <TextArea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={20}
                            placeholder="Markdown形式で記事を記述..."
                            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '14px' }}
                        />
                    )}
                </div>

                <div style={{ padding: '20px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', width: '100%' }}>
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            style={{ width: '20px', height: '20px', accentColor: '#0ea5e9' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                                公開設定
                            </span>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>
                                チェックを入れるとWebサイト上に公開されます。オフの場合は下書きとして保存されます。
                            </span>
                        </div>
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                    <Link href="/admin">
                        <Button type="button" variant="secondary">キャンセル</Button>
                    </Link>
                    <Button type="submit" loading={loading} size="lg">
                        {formData.published ? '記事を公開' : '下書きを保存'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
