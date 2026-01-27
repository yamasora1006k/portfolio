'use client';

import { useState, useRef } from 'react';
import { uploadWorkThumbnail } from '@/lib/storage';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    slug?: string;
    onUpload?: (file: File) => Promise<string>;
}

export function ImageUpload({ value, onChange, slug, onUpload }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        // ファイルタイプチェック
        if (!file.type.startsWith('image/')) {
            setError('画像ファイルを選択してください');
            return;
        }

        // ファイルサイズチェック（5MB以下）
        if (file.size > 5 * 1024 * 1024) {
            setError('ファイルサイズは5MB以下にしてください');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            let url: string;
            if (onUpload) {
                url = await onUpload(file);
            } else {
                // スラッグが空の場合はデフォルト名を使用
                const uploadSlug = slug || `temp_${Date.now()}`;
                url = await uploadWorkThumbnail(file, uploadSlug);
            }
            onChange(url);
        } catch (err) {
            console.error('Upload failed:', err);
            setError('アップロードに失敗しました');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className={styles.hiddenInput}
            />

            {value ? (
                <div className={styles.preview}>
                    <img src={value} alt="サムネイル" className={styles.previewImage} />
                    <div className={styles.previewOverlay}>
                        <button
                            type="button"
                            onClick={handleClick}
                            className={styles.changeButton}
                        >
                            変更
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className={styles.removeButton}
                        >
                            削除
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''} ${uploading ? styles.uploading : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    {uploading ? (
                        <div className={styles.uploadingContent}>
                            <div className={styles.spinner} />
                            <span>アップロード中...</span>
                        </div>
                    ) : (
                        <div className={styles.dropzoneContent}>
                            <svg
                                className={styles.uploadIcon}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className={styles.dropzoneText}>
                                クリックまたはドラッグ＆ドロップで画像をアップロード
                            </span>
                            <span className={styles.dropzoneHint}>
                                PNG, JPG, GIF (最大5MB)
                            </span>
                        </div>
                    )}
                </div>
            )}

            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}
