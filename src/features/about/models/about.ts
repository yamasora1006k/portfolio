export interface SkillGroup {
    category: string;
    items: string[];
}

export interface Experience {
    period: string;      // 表示用（自動生成または手入力）
    startDate?: string;  // 開始日 (YYYY-MM-DD)
    title: string;
    description: string;
}

export interface AboutData {
    id?: string;
    name: string;
    role: string;
    bio: string[];
    profileImage?: string;
    skills: SkillGroup[];
    experiences: Experience[];
    updatedAt?: any;
}
