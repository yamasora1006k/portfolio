import React from 'react';
import { Category } from '@/features/works/models/category';
import { Work } from '@/features/works/models/work';
import { Button } from '@/shared/components/ui/Button';

interface CategoryListProps {
    categories: Category[];
    works: Work[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    onSelect: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    works,
    onEdit,
    onDelete,
    onSelect
}) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {categories.map((category) => {
                const workCount = works.filter(w => w.categoryId === category.id).length;

                return (
                    <div
                        key={category.id}
                        onClick={() => onSelect(category)}
                        style={{
                            background: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3
                                    style={{
                                        margin: '0 0 4px 0',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                    }}
                                >
                                    {category.name}
                                </h3>
                                <span style={{
                                    fontSize: '13px',
                                    color: '#64748b',
                                    background: '#f1f5f9',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {category.slug}
                                </span>
                            </div>
                            <span style={{
                                background: '#3b82f6',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '20px',
                                padding: '2px 8px',
                                minWidth: '24px',
                                textAlign: 'center'
                            }}>
                                {workCount}
                            </span>
                        </div>

                        {category.description && (
                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.5, flex: 1 }}>
                                {category.description}
                            </p>
                        )}

                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                            <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); onSelect(category); }} style={{ flex: 1 }}>
                                作品一覧
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(category); }}>
                                編集
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(category.id); }} style={{ color: '#ef4444' }}>
                                削除
                            </Button>
                        </div>
                    </div>
                );
            })}

            {categories.length === 0 && (
                <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '60px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px dashed #cbd5e1',
                    color: '#64748b'
                }}>
                    <p style={{ fontSize: '16px', fontWeight: 500 }}>カテゴリがまだありません</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>右上の「新規カテゴリ」ボタンから作成してください</p>
                </div>
            )}
        </div>
    );
};
