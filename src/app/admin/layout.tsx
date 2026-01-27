import { AuthProvider, AdminGuard } from '@/features/admin/providers/AuthProvider';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminGuard>
                <div style={{ minHeight: '100vh', background: '#0f172a' }}>
                    {children}
                </div>
            </AdminGuard>
        </AuthProvider>
    );
}
