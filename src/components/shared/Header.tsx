import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
    { label: "About", path: "/" },
    { label: "Tech", path: "/tech" },
    { label: "Activities", path: "/act" },
];
export default function Header({ location, style }: { location: string, style?: React.CSSProperties }) {
    const navigate = useNavigate();
    return (
        <header style={{
            height: 'var(--nav-height)',
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-color)',
            zIndex: 10,
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            ...style
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}/img/logo/MIYANO_WH.svg`} alt="" style={{ height: 'calc(var(--nav-height) /3)', objectFit: 'contain' }} />
                <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {navItems.map((item) => {
                        const isActive = location === item.path;
                        return (
                            <a
                                key={item.path}
                                onClick={() => { navigate(item.path) }}
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            bottom: -2,
                                            height: '1px',
                                            backgroundColor: '#ffffff'
                                        }}
                                    />
                                )}
                            </a>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}