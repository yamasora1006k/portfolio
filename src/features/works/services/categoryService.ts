import { Category, CategoryInput } from '../models/category';
import { getFirestoreDb } from '@/lib/firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    DocumentData,
    serverTimestamp,
} from 'firebase/firestore';

const COLLECTION_NAME = 'categories';

// Firestoreドキュメントを Category 型に変換
function convertToCategory(id: string, data: DocumentData): Category {
    return {
        id,
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        order: data.order || 0,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
    };
}

// 開発用のモックデータ
export const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Programming',
        slug: 'programming',
        description: 'Web development, mobile apps, and system architecture.',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        name: 'Design',
        slug: 'design',
        description: 'UI/UX design, graphic design, and illustrations.',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        name: 'Videography',
        slug: 'videography',
        description: 'Video editing, motion graphics, and cinematography.',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// カテゴリ一覧を取得
export async function fetchCategories(): Promise<Category[]> {
    try {
        const db = getFirestoreDb();
        const categoriesRef = collection(db, COLLECTION_NAME);
        const q = query(categoriesRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('Firestore is empty, using mock data');
            return mockCategories;
        }

        return snapshot.docs.map(doc => convertToCategory(doc.id, doc.data()));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return mockCategories;
    }
}

// スラッグでカテゴリを取得
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        const db = getFirestoreDb();
        const categoriesRef = collection(db, COLLECTION_NAME);
        const q = query(categoriesRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return convertToCategory(doc.id, doc.data());
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return null;
    }
}

// IDでカテゴリを取得
export async function fetchCategoryById(id: string): Promise<Category | null> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return null;
        }

        return convertToCategory(snapshot.id, snapshot.data());
    } catch (error) {
        console.error('Error fetching category by id:', error);
        return null;
    }
}

// カテゴリを新規作成
export async function createCategory(categoryData: CategoryInput): Promise<string> {
    try {
        const db = getFirestoreDb();
        const categoriesRef = collection(db, COLLECTION_NAME);

        const docRef = await addDoc(categoriesRef, {
            ...categoryData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
}

// カテゴリを更新
export async function updateCategory(id: string, categoryData: Partial<CategoryInput>): Promise<void> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);

        await updateDoc(docRef, {
            ...categoryData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

// カテゴリを削除
export async function deleteCategory(id: string): Promise<void> {
    try {
        const db = getFirestoreDb();
        const docRef = doc(db, COLLECTION_NAME, id);

        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

// スラッグの一意性をチェック
export async function isCategorySlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    try {
        const db = getFirestoreDb();
        const categoriesRef = collection(db, COLLECTION_NAME);
        const q = query(categoriesRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return true;
        }

        if (excludeId) {
            return snapshot.docs.every(doc => doc.id === excludeId);
        }

        return false;
    } catch (error) {
        console.error('Error checking slug uniqueness:', error);
        return false;
    }
}
