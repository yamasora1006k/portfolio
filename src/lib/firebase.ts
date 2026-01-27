// Firebase設定ファイル
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase設定（環境変数から取得）
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Firebaseアプリの初期化（シングルトン）
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

function initializeFirebase(): FirebaseApp {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }
    return app;
}

// Firestoreの取得
export function getFirestoreDb(): Firestore {
    if (!db) {
        const app = initializeFirebase();
        db = getFirestore(app);
    }
    return db;
}

// Firebase Storageの取得
export function getFirebaseStorage(): FirebaseStorage {
    if (!storage) {
        const app = initializeFirebase();
        storage = getStorage(app);
    }
    return storage;
}

// Analyticsの初期化（クライアントサイドのみ）
export async function initializeAnalytics(): Promise<Analytics | null> {
    if (typeof window === 'undefined') {
        return null;
    }

    if (!analytics) {
        const supported = await isSupported();
        if (supported) {
            const app = initializeFirebase();
            analytics = getAnalytics(app);
        }
    }
    return analytics;
}

// Firebaseアプリのエクスポート
export function getFirebaseApp(): FirebaseApp {
    return initializeFirebase();
}

// Authの取得
import { getAuth, Auth } from 'firebase/auth';

let auth: Auth;

export function getFirebaseAuth(): Auth {
    if (!auth) {
        const app = initializeFirebase();
        auth = getAuth(app);
    }
    return auth;
}
