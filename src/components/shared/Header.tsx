export default function Header() {
    return (
        <header style={{
            height: 'var(--nav-height)',
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-color)',
            zIndex: 10,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Portfolio.</h1>
                <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <a href="#about">About</a>
                    <a href="#works">Works</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    )
}