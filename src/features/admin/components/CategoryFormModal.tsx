import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { TextArea } from '@/shared/components/ui/TextArea';
import { Button } from '@/shared/components/ui/Button';
import { Category, CategoryInput } from '@/features/works/models/category';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CategoryInput) => Promise<void>;
    category?: Category | null;
    existingCategories: Category[];
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
    isOpen,
    onClose,
    onSave,
    category,
    existingCategories
}) => {
    const [formData, setFormData] = useState<CategoryInput>({
        name: '',
        slug: '',
        description: '',
        order: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (category) {
                setFormData({
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    order: category.order
                });
            } else {
                setFormData({
                    name: '',
                    slug: '',
                    description: '',
                    order: existingCategories.length + 1
                });
            }
        }
    }, [isOpen, category, existingCategories.length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name,
            // Only auto-generate slug if it's new or slug matches the old generated pattern
            slug: (!category && !prev.slug) || (prev.slug === prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
                ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                : prev.slug,
        }));
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
            title={category ? 'カテゴリを編集' : '新規カテゴリを作成'}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input
                    label="カテゴリ名 *"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    placeholder="例: プログラミング"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <Input
                        label="スラッグ *"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        placeholder="programming"
                    />
                    <Input
                        label="表示順"
                        name="order"
                        type="number"
                        value={formData.order}
                        onChange={handleChange}
                    />
                </div>

                <TextArea
                    label="説明"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="このカテゴリの説明を入力してください..."
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                    <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
                        キャンセル
                    </Button>
                    <Button type="submit" loading={loading}>
                        {category ? '更新する' : '作成する'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
