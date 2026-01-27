// Firebase設定ファイル
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase設定
const firebaseConfig = {
    apiKey: "AIzaSyDFp7rEO9CGinsdCO_iNlThCFoAup0UAIg",
    authDomain: "portfolio-7c47a.firebaseapp.com",
    projectId: "portfolio-7c47a",
    storageBucket: "portfolio-7c47a.firebasestorage.app",
    messagingSenderId: "741745535098",
    appId: "1:741745535098:web:1c455b463e7ad03552b3c3",
    measurementId: "G-XQX1WRV41L"
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
