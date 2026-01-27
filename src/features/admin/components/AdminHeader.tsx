import React from 'react';
import { Button } from '@/shared/components/ui/Button';

interface AdminHeaderProps {
    title: string;
    onAdd?: () => void;
    actionLabel?: string;
    backAction?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    title,
    onAdd,
    actionLabel,
    backAction
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e2e8f0'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {backAction && (
                    <button
                        onClick={backAction}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '20px',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}
                    >
                        ←
                    </button>
                )}
                <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                    {title}
                </h1>
            </div>

            {onAdd && actionLabel && (
                <Button onClick={onAdd} size="lg">
                    + {actionLabel}
                </Button>
            )}
        </div>
    );
};
