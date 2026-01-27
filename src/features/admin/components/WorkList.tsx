import React from 'react';
import { Work } from '@/features/works/models/work';
import { Button } from '@/shared/components/ui/Button';

interface WorkListProps {
    works: Work[];
    onEdit: (work: Work) => void;
    onDelete: (id: string) => void;
}

export const WorkList: React.FC<WorkListProps> = ({
    works,
    onEdit,
    onDelete,
}) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {works.map((work) => (
                <div
                    key={work.id}
                    onClick={() => onEdit(work)}
                    style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                    }}
                >
                    {/* Thumbnail placeholder or image */}
                    <div style={{
                        height: '160px',
                        background: work.thumbnail ? `url(${work.thumbnail}) center/cover` : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                        borderBottom: '1px solid #e2e8f0'
                    }}>
                        {!work.thumbnail && 'No Image'}
                    </div>

                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                                    {work.title}
                                </h3>
                                {work.featured && (
                                    <span style={{ fontSize: '10px', background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                        ★
                                    </span>
                                )}
                            </div>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                            {new Date(work.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\//g, '.')} • {work.category}
                        </p>


                        <p style={{
                            fontSize: '14px',
                            color: '#475569',
                            margin: '0 0 16px 0',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {work.description}
                        </p>

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                            <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(work); }} style={{ flex: 1 }}>
                                編集
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(work.id); }} style={{ color: '#ef4444' }}>
                                削除
                            </Button>
                        </div>
                    </div>
                </div>
            ))
            }

            {
                works.length === 0 && (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '60px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '2px dashed #cbd5e1',
                        color: '#64748b'
                    }}>
                        <p style={{ fontSize: '16px', fontWeight: 500 }}>作品がまだありません</p>
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>右上の「新規作品」ボタンから作成してください</p>
                    </div>
                )
            }
        </div >
    );
};
