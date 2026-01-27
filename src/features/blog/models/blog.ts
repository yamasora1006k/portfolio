export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Markdown content
    date: string; // Display date string (e.g. "2024.01.27")
    slug: string;
    thumbnail?: string;
    category?: string[];
    published: boolean;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
}
