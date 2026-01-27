import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { TextArea } from '@/shared/components/ui/TextArea';
import { Button } from '@/shared/components/ui/Button';
import { Work } from '@/features/works/models/work';
import { WorkInput } from '@/features/works/services/worksService';
import { Category } from '@/features/works/models/category';
import { ImageUpload } from '@/shared/components/admin/ImageUpload';

interface WorkFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: WorkInput) => Promise<void>;
    work?: Work | null;
    category: Category;
}

export const WorkFormModal: React.FC<WorkFormModalProps> = ({
    isOpen,
    onClose,
    onSave,
    work,
    category
}) => {
    const [formData, setFormData] = useState<WorkInput>({
        slug: work?.slug || '',
        title: work?.title || '',
        description: work?.description || '',
        thumbnail: work?.thumbnail || '',
        categoryId: category.id,
        category: work?.category || category.name,
        technologies: work?.technologies || [],
        date: work?.date || new Date().toISOString().split('T')[0],
        featured: work?.featured || false,
        background: work?.background || '',
        challenge: work?.challenge || '',
        role: work?.role || '',
        process: work?.process || '',
        implementation: work?.implementation || '',
        outcome: work?.outcome || '',
        lessons: work?.lessons || '',
        liveUrl: work?.liveUrl || '',
        githubUrl: work?.githubUrl || '',
    });
    const [techInput, setTechInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (work) {
                setFormData({
                    slug: work.slug, title: work.title, description: work.description || '', thumbnail: work.thumbnail || '',
                    categoryId: category.id, category: work.category || category.name, technologies: work.technologies || [],
                    date: work.date || (work.year ? `${work.year}-01-01` : new Date().toISOString().split('T')[0]),
                    featured: work.featured || false,
                    background: work.background || '', challenge: work.challenge || '', role: work.role || '',
                    process: work.process || '', implementation: work.implementation || '', outcome: work.outcome || '',
                    lessons: work.lessons || '', liveUrl: work.liveUrl || '', githubUrl: work.githubUrl || ''
                });
            } else {
                setFormData({
                    slug: '', title: '', description: '', thumbnail: '', categoryId: category.id, category: category.name,
                    technologies: [], date: new Date().toISOString().split('T')[0], featured: false,
                    background: '', challenge: '', role: '', process: '', implementation: '', outcome: '', lessons: '', liveUrl: '', githubUrl: ''
                });
            }
        }
    }, [isOpen, work, category]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        // Handle checkbox manually
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddTech = () => {
        if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
            setFormData(prev => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }));
            setTechInput('');
        }
    };

    const handleRemoveTech = (tech: string) => {
        setFormData(prev => ({ ...prev, technologies: prev.technologies.filter(t => t !== tech) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={work ? '作品を編集' : '新規作品を作成'}
            width="800px"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <Input label="タイトル *" name="title" value={formData.title} onChange={handleChange} required />
                    <Input label="スラッグ *" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <Input label="サブカテゴリ" name="category" value={formData.category} onChange={handleChange} />
                    <Input label="完了日" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>

                <TextArea label="説明 *" name="description" value={formData.description} onChange={handleChange} required />

                {/* Thumbnails */}
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>サムネイル画像</label>
                    <ImageUpload
                        value={formData.thumbnail}
                        onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                        slug={formData.slug}
                    />
                </div>

                {/* Tech Stack */}
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px', display: 'block' }}>技術スタック</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <Input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                            placeholder="技術名を入力 (Enterで追加)"
                        />
                        <Button type="button" onClick={handleAddTech} variant="secondary">追加</Button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {formData.technologies.map(tech => (
                            <span key={tech} style={{
                                background: '#eff6ff', color: '#3b82f6',
                                padding: '4px 8px', borderRadius: '16px', fontSize: '13px',
                                display: 'inline-flex', alignItems: 'center', gap: '4px'
                            }}>
                                {tech}
                                <button type="button" onClick={() => handleRemoveTech(tech)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#3b82f6' }}>×</button>
                            </span>
                        ))}
                    </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>注目作品として表示</span>
                </label>

                {/* Optional Fields Group */}
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#64748b' }}>詳細情報（任意）</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextArea label="背景" name="background" value={formData.background} onChange={handleChange} />
                        <TextArea label="課題" name="challenge" value={formData.challenge} onChange={handleChange} />
                        <Input label="役割" name="role" value={formData.role} onChange={handleChange} />
                        <TextArea label="実装" name="implementation" value={formData.implementation} onChange={handleChange} />
                        <TextArea label="成果" name="outcome" value={formData.outcome} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
                        キャンセル
                    </Button>
                    <Button type="submit" loading={loading}>
                        {work ? '更新する' : '作成する'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
