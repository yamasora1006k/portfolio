// Contact form types
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export type ContactSubject =
    | 'general'
    | 'project'
    | 'collaboration'
    | 'other';

export const subjectOptions: { value: ContactSubject; label: string }[] = [
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'project', label: 'プロジェクトの依頼' },
    { value: 'collaboration', label: 'コラボレーションのご相談' },
    { value: 'other', label: 'その他' },
];

export interface ContactFormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
