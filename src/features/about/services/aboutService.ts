import {
    doc,
    getDoc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { getFirestoreDb, getFirebaseStorage } from '@/lib/firebase';
import { AboutData } from '../models/about';

const DOCUMENT_PATH = 'settings/about';

// デフォルトデータ
const defaultAboutData: AboutData = {
    name: '山口 空',
    role: 'Designer & Developer',
    bio: [
        'デザインと開発の両方のスキルを活かし、ユーザー体験を大切にしたプロダクトを作っています。',
        '「同じ空でも、見るたびに違う」—— このサイトのように、一面的ではない表現を通じて、プロジェクトごとに最適な解決策を提案します。'
    ],
    skills: [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Vue.js'] },
        { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Firebase'] },
        { category: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'] },
        { category: 'Mobile', items: ['Flutter', 'React Native', 'Swift'] },
    ],
    experiences: [
        {
            period: '2023 - Present',
            title: 'Freelance Designer & Developer',
            description: 'Webデザイン・開発のフリーランスとして活動。',
        },
        {
            period: '2021 - 2023',
            title: 'Web Developer',
            description: 'フロントエンド開発を中心に、UI/UXデザインも担当。',
        },
    ]
};

// About データを取得
export async function fetchAboutData(): Promise<AboutData> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, DOCUMENT_PATH);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as AboutData;
        }

        // ドキュメントが存在しない場合はデフォルトを返す
        return defaultAboutData;
    } catch (error) {
        console.error('Failed to fetch about data:', error);
        return defaultAboutData;
    }
}

// About データを更新
export async function updateAboutData(data: Partial<AboutData>): Promise<void> {
    const db = getFirestoreDb();
    const docRef = doc(db, DOCUMENT_PATH);

    await setDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
    }, { merge: true });
}

// プロフィール画像アップロード
export async function uploadProfileImage(file: File): Promise<string> {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, `about/profile_${Date.now()}_${file.name}`);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
