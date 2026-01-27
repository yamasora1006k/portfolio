import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    // Since we don't have tailwind utility classes fully set up in the workflow context, I will map these to style objects or use inline styles if strict CSS modules aren't available, BUT since className is accepted, I'll rely on global CSS utility classes if they exist.
    // However, looking at the project, it uses CSS Modules mostly. 
    // To be safe and self-contained, I will use inline styles or a local module.
    // For this rapid iteration, I'll use style objects mapped from the variants for simplicity and reliability without adding new CSS files yet.

    // Wait, the user has tailwind in package.json (v4). 
    // If tailwind is configured, I should use classes.
    // The package.json has "@tailwindcss/postcss" so it is likely set up.
    // I will try to use Tailwind classes, but fallback to style prop for critical colors if tailwind isn't building.
    // Actually, let's Stick to standard inline styles for reliability in this specific file if I am unsure about the global config.
    // BUT, for a "Premium Design", Tailwind classes are much better if they work.
    // Let's assume standard CSS classes don't exist and write a minimal CSS Module for this or just style inline.
    // Let's go with a hybrid: Styled generic component.

    const styleMap = {
        primary: { background: '#2563eb', color: 'white', border: 'none' },
        secondary: { background: 'white', color: '#374151', border: '1px solid #d1d5db' },
        danger: { background: '#dc2626', color: 'white', border: 'none' },
        ghost: { background: 'transparent', color: '#4b5563', border: 'none' }
    };

    const sizeMap = {
        sm: { padding: '6px 12px', fontSize: '14px' },
        md: { padding: '8px 16px', fontSize: '14px' },
        lg: { padding: '12px 24px', fontSize: '16px' }
    };

    return (
        <button
            disabled={disabled || loading}
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                fontWeight: 500,
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                opacity: disabled || loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
                ...styleMap[variant],
                ...sizeMap[size],
            }}
            {...props}
        >
            {loading ? (
                <span style={{ marginRight: '8px' }}>...</span>
            ) : null}
            {children}
        </button>
    );
};
