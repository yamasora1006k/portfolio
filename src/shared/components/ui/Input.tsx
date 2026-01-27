import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    style,
    ...props
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {label && (
                <label style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151'
                }}>
                    {label}
                </label>
            )}
            <input
                className={className}
                style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    width: '100%',
                    color: '#000000', // Explicit black
                    backgroundColor: '#ffffff', // Explicit white
                    ...style
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = error ? '#ef4444' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                {...props}
            />
            {error && (
                <span style={{ fontSize: '12px', color: '#ef4444' }}>
                    {error}
                </span>
            )}
        </div>
    );
};
