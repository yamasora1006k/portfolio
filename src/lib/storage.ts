import { getFirebaseStorage } from '@/lib/firebase';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';

// 画像をアップロードしてURLを取得
export async function uploadImage(
    file: File,
    path: string
): Promise<string> {
    try {
        const storage = getFirebaseStorage();
        const storageRef = ref(storage, path);

        // ファイルをアップロード
        const snapshot = await uploadBytes(storageRef, file);

        // ダウンロードURLを取得
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// 作品のサムネイルをアップロード
export async function uploadWorkThumbnail(
    file: File,
    workSlug: string
): Promise<string> {
    // ファイル名を生成（タイムスタンプ付き）
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const path = `works/${workSlug}/thumbnail_${timestamp}.${extension}`;

    return uploadImage(file, path);
}

// 作品の追加画像をアップロード
export async function uploadWorkImage(
    file: File,
    workSlug: string,
    index: number
): Promise<string> {
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const path = `works/${workSlug}/image_${index}_${timestamp}.${extension}`;

    return uploadImage(file, path);
}

// 画像を削除
export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        const storage = getFirebaseStorage();
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
        // 削除に失敗しても続行（存在しない場合など）
    }
}
