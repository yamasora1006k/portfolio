'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Work } from '@/features/works/models/work';
import { Category, CategoryInput } from '@/features/works/models/category';
import { BlogPost } from '@/features/blog/models/blog';
import {
    fetchWorks,
    createWork,
    updateWork,
    deleteWork,
    WorkInput,
} from '@/features/works/services/worksService';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '@/features/works/services/categoryService';
import {
    fetchAllBlogPosts,
    deleteBlogPost
} from '@/features/blog/services/blogService';

import { AdminHeader } from '@/features/admin/components/AdminHeader';
import { CategoryList } from '@/features/admin/components/CategoryList';
import { CategoryFormModal } from '@/features/admin/components/CategoryFormModal';
import { WorkList } from '@/features/admin/components/WorkList';
import { WorkFormModal } from '@/features/admin/components/WorkFormModal';
import { Button } from '@/shared/components/ui/Button';

type ViewMode = 'categories' | 'works' | 'posts';

export default function AdminPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('categories');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Blog
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

    // Modals
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<Work | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [categoriesData, worksData] = await Promise.all([
                fetchCategories(),
                fetchWorks(),
            ]);
            setCategories(categoriesData);
            setWorks(worksData);
        } catch (error: any) {
            console.error('Failed to load data:', error);
            setMessage({ type: 'error', text: `データの読み込みに失敗しました: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const loadPosts = async () => {
        setLoadingPosts(true);
        try {
            const data = await fetchAllBlogPosts();
            setPosts(data);
        } catch (error: any) {
            console.error('Failed to load posts:', error);
            setMessage({ type: 'error', text: `記事の読み込みに失敗しました: ${error.message}` });
        } finally {
            setLoadingPosts(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (viewMode === 'posts') loadPosts();
    }, [viewMode]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Handlers
    const handleCategorySave = async (data: CategoryInput) => {
        if (editingCategory) {
            await updateCategory(editingCategory.id, data);
            setMessage({ type: 'success', text: 'カテゴリを更新しました' });
        } else {
            await createCategory(data);
            setMessage({ type: 'success', text: 'カテゴリを作成しました' });
        }
        setEditingCategory(null);
        loadData();
    };

    const handleWorkSave = async (data: WorkInput) => {
        if (editingWork) {
            await updateWork(editingWork.id, data);
            setMessage({ type: 'success', text: '作品を更新しました' });
        } else {
            await createWork(data);
            setMessage({ type: 'success', text: '作品を作成しました' });
        }
        setEditingWork(null);
        loadData();
    };

    const handleCategoryDelete = async (id: string) => {
        const categoryWorks = works.filter(w => w.categoryId === id);
        if (categoryWorks.length > 0) {
            alert('このカテゴリには作品が含まれています。先に作品を削除または移動してください。');
            return;
        }
        if (!confirm('本当にこのカテゴリを削除しますか？')) return;

        try {
            await deleteCategory(id);
            setMessage({ type: 'success', text: 'カテゴリを削除しました' });
            loadData();
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message });
        }
    };

    const handleWorkDelete = async (id: string) => {
        if (!confirm('本当にこの作品を削除しますか？')) return;
        try {
            await deleteWork(id);
            setMessage({ type: 'success', text: '作品を削除しました' });
            loadData();
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message });
        }
    };

    const handlePostDelete = async (id: string) => {
        if (!confirm('本当にこの記事を削除しますか？')) return;
        try {
            await deleteBlogPost(id);
            setMessage({ type: 'success', text: '記事を削除しました' });
            loadPosts();
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message });
        }
    };

    // Render Logic
    const filteredWorks = selectedCategory ? works.filter(w => w.categoryId === selectedCategory.id) : [];

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Toast Message */}
                {message && (
                    <div style={{
                        position: 'fixed', top: '20px', right: '20px', zIndex: 2000,
                        background: message.type === 'success' ? '#10b981' : '#ef4444',
                        color: 'white', padding: '12px 24px', borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontWeight: 500
                    }}>
                        {message.text}
                    </div>
                )}

                {/* Main Navigation */}
                <div style={{ marginBottom: '40px', display: 'flex', gap: '8px', background: 'white', padding: '8px', borderRadius: '12px', width: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <Button
                        variant={viewMode === 'categories' || viewMode === 'works' ? 'primary' : 'ghost'}
                        onClick={() => { setViewMode('categories'); setSelectedCategory(null); }}
                    >
                        Works & Categories
                    </Button>
                    <Button
                        variant={viewMode === 'posts' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('posts')}
                    >
                        Blog Posts
                    </Button>
                    <Link href="/admin/home">
                        <Button variant="ghost">
                            Home
                        </Button>
                    </Link>
                    <Link href="/admin/about">
                        <Button variant="ghost">
                            About
                        </Button>
                    </Link>
                </div>

                {/* Content */}
                <div style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                    {viewMode === 'categories' && (
                        <>
                            <AdminHeader
                                title="カテゴリ管理"
                                onAdd={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
                                actionLabel="新規カテゴリ"
                            />
                            <CategoryList
                                categories={categories}
                                works={works}
                                onEdit={(cat) => { setEditingCategory(cat); setIsCategoryModalOpen(true); }}
                                onDelete={handleCategoryDelete}
                                onSelect={(cat) => { setSelectedCategory(cat); setViewMode('works'); }}
                            />
                        </>
                    )}

                    {viewMode === 'works' && selectedCategory && (
                        <>
                            <AdminHeader
                                title={`${selectedCategory.name} の作品`}
                                onAdd={() => { setEditingWork(null); setIsWorkModalOpen(true); }}
                                actionLabel="新規作品"
                                backAction={() => { setSelectedCategory(null); setViewMode('categories'); }}
                            />
                            <WorkList
                                works={filteredWorks}
                                onEdit={(work) => { setEditingWork(work); setIsWorkModalOpen(true); }}
                                onDelete={handleWorkDelete}
                            />
                        </>
                    )}

                    {viewMode === 'posts' && (
                        <>
                            <AdminHeader title="記事管理" />
                            <div style={{ marginBottom: '20px' }}>
                                <Link href="/admin/posts/new">
                                    <Button size="lg">+ 新規記事作成</Button>
                                </Link>
                            </div>

                            <div style={{ display: 'grid', gap: '16px' }}>
                                {posts.map(post => (
                                    <div key={post.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>{post.title}</h3>
                                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                                                {post.date} • <span style={{ color: post.published ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{post.published ? '公開中' : '下書き'}</span>
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link href={`/admin/posts/${post.id}`}>
                                                <Button variant="secondary" size="sm">編集</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" onClick={() => handlePostDelete(post.id)} style={{ color: '#ef4444' }}>削除</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Modals */}
                <CategoryFormModal
                    isOpen={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onSave={handleCategorySave}
                    category={editingCategory}
                    existingCategories={categories}
                />

                {selectedCategory && (
                    <WorkFormModal
                        isOpen={isWorkModalOpen}
                        onClose={() => setIsWorkModalOpen(false)}
                        onSave={handleWorkSave}
                        work={editingWork}
                        category={selectedCategory}
                    />
                )}
            </div>
        </div>
    );
}
