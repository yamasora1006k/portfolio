import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    Timestamp,
    limit
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { getFirestoreDb, getFirebaseStorage } from '@/lib/firebase';
import { BlogPost } from '../models/blog';

const COLLECTION_NAME = 'posts';

// モックブログデータ（静的エクスポート時のフォールバック用）
export const mockBlogPosts: BlogPost[] = [
    {
        id: 'mock-1',
        slug: 'welcome',
        title: 'Welcome to My Blog',
        content: 'This is a placeholder blog post. Add your own posts through the admin panel.',
        excerpt: 'Welcome to my blog!',
        date: '2026-01-01',
        category: ['General'],
        published: true,
        createdAt: null as any,
        updatedAt: null as any
    }
];

// 記事一覧取得（公開済みのみ）
export async function fetchBlogPosts(): Promise<BlogPost[]> {
    const db = getFirestoreDb();
    const q = query(
        collection(db, COLLECTION_NAME),
        where('published', '==', true)
        // orderBy('date', 'desc') // インデックス回避のためクライアントサイドソート
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as BlogPost));

    // 日付の降順でソート
    return posts.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    });
}

// 全記事取得（管理画面用）
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
    const db = getFirestoreDb();
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as BlogPost));

}

// 静的パス生成用にすべてのスラグを取得（ソートなし）
export async function fetchBlogPostSlugs(): Promise<BlogPost[]> {
    const db = getFirestoreDb();
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as BlogPost));
}

// スラグで記事取得
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const db = getFirestoreDb();
    const q = query(
        collection(db, COLLECTION_NAME),
        where('slug', '==', slug),
        limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data()
    } as BlogPost;
}

// IDで記事取得
export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
    const db = getFirestoreDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
        id: docSnap.id,
        ...docSnap.data()
    } as BlogPost;
}

// 記事作成
export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const db = getFirestoreDb();
    const now = Timestamp.now();

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: now,
        updatedAt: now
    });

    return docRef.id;
}

// 記事更新
export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<void> {
    const db = getFirestoreDb();
    const docRef = doc(db, COLLECTION_NAME, id);

    await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
    });
}

// 記事削除
export async function deleteBlogPost(id: string): Promise<void> {
    const db = getFirestoreDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
}

// 画像アップロード
export async function uploadBlogImage(file: File): Promise<string> {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
