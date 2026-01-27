import {
    collection,
    addDoc,
    Timestamp
} from 'firebase/firestore';
import { getFirestoreDb } from '@/lib/firebase';
import { ContactFormData } from '../models/contact';

const COLLECTION_NAME = 'contacts';

// お問い合わせを送信（Firestoreに保存）
export async function sendContactForm(data: ContactFormData): Promise<string> {
    const db = getFirestoreDb();

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...data,
            createdAt: Timestamp.now(),
            status: 'unread' // 管理用ステータス
        });

        return docRef.id;
    } catch (error) {
        console.error('Error sending contact form:', error);
        throw new Error('送信に失敗しました');
    }
}
