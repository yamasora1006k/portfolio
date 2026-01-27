import { Work } from '../models/work';
import { getFirestoreDb } from '@/lib/firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    query,
    where,
    orderBy,
    DocumentData,
    serverTimestamp,
} from 'firebase/firestore';

const COLLECTION_NAME = 'works';

// Firestoreドキュメントを Work 型に変換
function convertToWork(id: string, data: DocumentData): Work {
    // 日付フォールバック: dateがなければyearを使ってYYYY-01-01にするか、あるいは現在日付
    const date = data.date || (data.year ? `${data.year}-01-01` : new Date().toISOString().split('T')[0]);

    return {
        id,
        slug: data.slug || '',
        title: data.title || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        categoryId: data.categoryId || '',
        category: data.category || '',
        technologies: data.technologies || [],
        date: date,
        year: data.year || parseInt(date.split('-')[0]), // 後方互換性
        featured: data.featured || false,
        background: data.background,
        challenge: data.challenge,
        role: data.role,
        process: data.process,
        implementation: data.implementation,
        outcome: data.outcome,
        lessons: data.lessons,
        images: data.images,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
    };
}

// 開発用のモックデータ
export const mockWorks: Work[] = [
    {
        id: '1',
        slug: 'sky-variants-portfolio',
        title: 'Sora Studio',
        description: '動的に変化する空をコンセプトにしたポートフォリオサイト',
        thumbnail: '/portfolio/images/works/sky-variants.png',
        categoryId: 'programming',
        category: 'Web Development',
        technologies: ['Next.js', 'TypeScript', 'CSS'],
        date: '2024-01-15',
        year: 2024,
        featured: true,
        background: 'ポートフォリオサイトを刷新するにあたり、「同じ人でも、見る人・見る瞬間によって違う印象を持つ」という体験を設計したいと考えました。',
        challenge: '単なる作品一覧ではなく、訪問するたびに異なる印象を与えるUIを実現すること。',
        role: 'デザイン・開発（フルスタック）',
        process: 'コンセプト策定 → ワイヤーフレーム → Sky Change Systemの設計 → 実装 → テスト',
        implementation: 'Next.js App Routerを使用し、CSS Variablesとシード付き乱数で「破綻しないランダム」を実現。',
        outcome: '訪問するたびに異なる空が表示され、滞在中も徐々に変化するインタラクティブな体験を実現。',
        lessons: 'ランダム性と再現性のバランス、パフォーマンスを考慮したアニメーション設計の重要性を学びました。',
    },
    {
        id: '2',
        slug: 'task-management-app',
        title: 'Task Flow',
        description: '直感的なタスク管理アプリケーション',
        thumbnail: '/portfolio/images/works/taskflow.png',
        categoryId: 'programming',
        category: 'Web Application',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        date: '2024-02-10',
        year: 2024,
        featured: true,
        background: '日々のタスク管理をより効率的に行いたいというニーズから開発を開始。',
        challenge: 'シンプルさと機能性の両立。',
        role: 'フロントエンド開発',
        process: 'ユーザーリサーチ → プロトタイプ → 開発 → ユーザーテスト',
        implementation: 'React + Redux Toolkitでstate管理、REST APIでバックエンド連携。',
        outcome: 'ユーザーテストで高い評価を獲得。',
        lessons: 'ユーザー中心設計の重要性を実感。',
    },
    {
        id: '3',
        slug: 'e-commerce-redesign',
        title: 'EC Site Redesign',
        description: 'ECサイトのUIリデザインプロジェクト',
        thumbnail: '/portfolio/images/works/ec-redesign.png',
        categoryId: 'design',
        category: 'UI/UX Design',
        technologies: ['Figma', 'Prototyping'],
        date: '2023-11-20',
        year: 2023,
        featured: false,
        background: 'コンバージョン率向上のためのUIリデザイン依頼。',
        challenge: '既存ユーザーの使いやすさを維持しながら、新規ユーザーにもわかりやすいデザイン。',
        role: 'UIデザイナー',
        process: '現状分析 → ユーザーインタビュー → デザイン → プロトタイプ',
        implementation: 'Figmaでプロトタイプを作成し、ユーザーテストを実施。',
        outcome: 'コンバージョン率15%向上。',
        lessons: 'データドリブンなデザイン決定の有効性。',
    },
    {
        id: '4',
        slug: 'mobile-fitness-app',
        title: 'FitTrack',
        description: 'フィットネストラッキングモバイルアプリ',
        thumbnail: '/portfolio/images/works/fittrack.png',
        categoryId: 'programming',
        category: 'Mobile App',
        technologies: ['Flutter', 'Firebase', 'Dart'],
        date: '2023-08-05',
        year: 2023,
        featured: true,
        background: '運動習慣をゲーム感覚で継続できるアプリを開発。',
        challenge: 'モチベーション維持のためのゲーミフィケーション設計。',
        role: 'モバイルアプリ開発',
        process: 'コンセプト → プロトタイプ → 開発 → ベータテスト → リリース',
        implementation: 'FlutterでクロスプラットフォームDevelopment、Firebaseでバックエンド。',
        outcome: 'App Storeで4.5星評価獲得。',
        lessons: 'ユーザーフィードバックの重要性を再認識。',
    },
];

// ユニークなカテゴリ一覧を取得
export function getCategories(works: Work[]): string[] {
    const categories = new Set(works.map(w => w.category));
    return Array.from(categories);
}

// ユニークな技術一覧を取得
export function getTechnologies(works: Work[]): string[] {
    const technologies = new Set(works.flatMap(w => w.technologies));
    return Array.from(technologies);
}

// ユニークな年一覧を取得 (Dateから年を抽出)
export function getYears(works: Work[]): number[] {
    const years = new Set(works.map(w => parseInt(w.date.split('-')[0])));
    return Array.from(years).sort((a, b) => b - a);
}

// 作品一覧を取得
export async function fetchWorks(): Promise<Work[]> {
    try {
        const db = getFirestoreDb();
        const worksRef = collection(db, COLLECTION_NAME);

        // とりあえず全件取得
        const snapshot = await getDocs(worksRef);

        if (snapshot.empty) {
            console.log('Firestore is empty, using mock data');
            return mockWorks;
        }

        const works = snapshot.docs.map(doc => convertToWork(doc.id, doc.data()));
        // 日付降順ソート
        return works.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
        console.error('Error fetching works from Firestore:', error);
        return mockWorks.sort((a, b) => b.date.localeCompare(a.date));
    }
}

// スラッグで作品を取得
export async function fetchWorkBySlug(slug: string): Promise<Work | null> {
    try {
        const db = getFirestoreDb();
        const worksRef = collection(db, COLLECTION_NAME);
        const q = query(worksRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return mockWorks.find(w => w.slug === slug) || null;
        }

        const doc = snapshot.docs[0];
        return convertToWork(doc.id, doc.data());
    } catch (error) {
        console.error('Error fetching work by slug:', error);
        return mockWorks.find(w => w.slug === slug) || null;
    }
}

// 注目作品を取得
export async function fetchFeaturedWorks(): Promise<Work[]> {
    try {
        const db = getFirestoreDb();
        const worksRef = collection(db, COLLECTION_NAME);
        const q = query(worksRef, where('featured', '==', true));
        const snapshot = await getDocs(q);

        let works: Work[];
        if (snapshot.empty) {
            works = mockWorks.filter(w => w.featured);
        } else {
            works = snapshot.docs.map(doc => convertToWork(doc.id, doc.data()));
        }

        return works.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
        console.error('Error fetching featured works:', error);
        return mockWorks.filter(w => w.featured).sort((a, b) => b.date.localeCompare(a.date));
    }
}

// IDで作品を取得
export async function fetchWorkById(id: string): Promise<Work | null> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return mockWorks.find(w => w.id === id) || null;
        }

        return convertToWork(snapshot.id, snapshot.data());
    } catch (error) {
        console.error('Error fetching work by id:', error);
        return mockWorks.find(w => w.id === id) || null;
    }
}

// 入力データの型定義
export type WorkInput = Omit<Work, 'id'>;

// 作品を新規作成
export async function createWork(workData: WorkInput): Promise<string> {
    try {
        const db = getFirestoreDb();
        const worksRef = collection(db, COLLECTION_NAME);

        // yearフィールドも一応保存しておく（後方互換性）
        const year = parseInt(workData.date.split('-')[0]);

        const docRef = await addDoc(worksRef, {
            ...workData,
            year: year,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating work:', error);
        throw error;
    }
}

// 作品を更新
export async function updateWork(id: string, workData: Partial<WorkInput>): Promise<void> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);

        const updates: any = {
            ...workData,
            updatedAt: serverTimestamp(),
        };

        if (workData.date) {
            updates.year = parseInt(workData.date.split('-')[0]);
        }

        await setDoc(docRef, updates, { merge: true });
    } catch (error) {
        console.error('Error updating work:', error);
        throw error;
    }
}

export async function deleteWork(id: string): Promise<void> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting work:', error);
        throw error;
    }
}

export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    try {
        const db = getFirestoreDb();
        const worksRef = collection(db, COLLECTION_NAME);
        const q = query(worksRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return true;
        if (excludeId) return snapshot.docs.every(doc => doc.id === excludeId);
        return false;
    } catch (error) {
        console.error('Error checking slug uniqueness:', error);
        return false;
    }
}
