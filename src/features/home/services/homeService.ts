import {
    doc,
    getDoc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import { getFirestoreDb } from '@/lib/firebase';
import { HomeData } from '../models/home';

const DOCUMENT_PATH = 'settings/home';

// デフォルトデータ
const defaultHomeData: HomeData = {
    heroSubtitle: 'Designer & Developer',
    heroTitleFirst: 'Sora',
    heroTitleLast: 'Yamaguchi',
    heroConceptText: '空はいつも\n変わり続けます',
    aboutPreviewText: '山口空です。\nデザインと開発の両方のスキルを活かし、\nユーザー体験を大切にしたプロダクトを作っています。'
};

// Home データを取得
export async function fetchHomeData(): Promise<HomeData> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, DOCUMENT_PATH);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as HomeData;
        }

        return defaultHomeData;
    } catch (error) {
        console.error('Failed to fetch home data:', error);
        return defaultHomeData;
    }
}

// Home データを更新
export async function updateHomeData(data: Partial<HomeData>): Promise<void> {
    const db = getFirestoreDb();
    const docRef = doc(db, DOCUMENT_PATH);

    await setDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
    }, { merge: true });
}
