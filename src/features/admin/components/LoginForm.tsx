'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase';
import styles from './LoginForm.module.css';

// 許可された管理者メールアドレス
const ALLOWED_ADMINS = [
    'yamaguchisora1006@gmail.com',
    'kmc2342@kamiyama.ac.jp'
];

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const auth = getFirebaseAuth();

            // まずログインを試行
            try {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/admin');
            } catch (loginError: any) {
                // ユーザーが見つからず、かつ許可されたメールアドレスなら作成を試みる
                // auth/user-not-found は古いエラーコードの場合もあるため invalid-credential もチェック
                if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential') {
                    if (ALLOWED_ADMINS.includes(email)) {
                        await createUserWithEmailAndPassword(auth, email, password);
                        router.push('/admin');
                        return;
                    }
                }
                throw loginError;
            }
        } catch (err: any) {
            console.error(err);
            if (ALLOWED_ADMINS.includes(email)) {
                setError('Failed to login. If creating a new admin account, ensure password meets requirements (min 6 chars).');
            } else {
                setError('Failed to login. This email is not authorized for admin access.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Admin Login</h1>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.field}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
