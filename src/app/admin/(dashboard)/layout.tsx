import { AdminGuard } from '@/features/admin/providers/AuthProvider';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminGuard>
            <div className="admin-dashboard">
                <header style={{
                    background: '#1e293b',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Link href="/admin" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        CMS Admin
                    </Link>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/" target="_blank" style={{ color: '#94a3b8' }}>View Site</Link>
                        {/* Logout is handled in AuthProvider/Guard context or separate component, but simplified here */}
                    </div>
                </header>
                <main style={{ padding: '2rem' }}>
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
