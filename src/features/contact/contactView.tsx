'use client';

import { useState, FormEvent } from 'react';
import styles from './contactView.module.css';
import {
    ContactFormData,
    ContactFormErrors,
    FormStatus,
    subjectOptions
} from './models/contact';
import { sendContactForm } from './services/contactService';

// バリデーション
function validateForm(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};

    // メールアドレスは必須
    if (!data.email.trim()) {
        errors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = '有効なメールアドレスを入力してください';
    }

    // 用件は必須
    if (!data.subject) {
        errors.subject = '用件を選択してください';
    }

    // メッセージは必須
    if (!data.message.trim()) {
        errors.message = 'メッセージを入力してください';
    } else if (data.message.length < 10) {
        errors.message = 'メッセージは10文字以上入力してください';
    }

    return errors;
}

export function ContactView() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 入力開始時にエラーをクリア
        if (errors[name as keyof ContactFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // バリデーションを実行
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('submitting');

        try {
            await sendContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className={styles.contactPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className="section-heading">
                        <span>Contact</span>
                    </h1>
                    <p className={styles.subtitle}>
                        お気軽にご連絡ください
                    </p>
                </header>

                <div className={styles.formWrapper}>
                    {status === 'success' ? (
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✓</div>
                            <h2 className={styles.successTitle}>送信完了</h2>
                            <p className={styles.successText}>
                                お問い合わせありがとうございます。<br />
                                内容を確認次第、ご連絡いたします。
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className={styles.resetButton}
                            >
                                新しいメッセージを送る
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* お名前（任意） */}
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    お名前 <span className={styles.optional}>(任意)</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="山田 太郎"
                                />
                            </div>

                            {/* メールアドレス（必須） */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    メールアドレス <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                    placeholder="example@email.com"
                                    required
                                />
                                {errors.email && (
                                    <span className={styles.errorMessage}>{errors.email}</span>
                                )}
                            </div>

                            {/* 用件（必須） */}
                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.label}>
                                    用件 <span className={styles.required}>*</span>
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
                                    required
                                >
                                    <option value="">選択してください</option>
                                    {subjectOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject && (
                                    <span className={styles.errorMessage}>{errors.subject}</span>
                                )}
                            </div>

                            {/* メッセージ（必須） */}
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>
                                    メッセージ <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                    placeholder="お問い合わせ内容をご記入ください"
                                    rows={6}
                                    required
                                />
                                {errors.message && (
                                    <span className={styles.errorMessage}>{errors.message}</span>
                                )}
                            </div>

                            {/* 送信ボタン */}
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <span className={styles.spinner} />
                                        送信中...
                                    </>
                                ) : (
                                    '送信する'
                                )}
                            </button>

                            {status === 'error' && (
                                <p className={styles.errorBanner}>
                                    送信に失敗しました。もう一度お試しください。
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
