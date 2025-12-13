export default function Footer() {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} 宮野柊太 All rights reserved.</p>
            </div>
        </footer>
    )
}