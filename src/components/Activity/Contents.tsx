import type { JSX } from "react";

export class Content {
    title: string;
    description: string;
    create_at: Date;
    tag: string[];
    url_type: string | null;
    url: string | null;
    img: string | null;
    img_brt: number | null;
    body: JSX.Element;

    constructor(title: string, description: string, create_at: Date, tag: string[], url_type: string | null, url: string | null, img: string | null, img_brt: number | null, body: JSX.Element) {
        this.title = title;
        this.description = description;
        this.create_at = create_at;
        this.tag = tag;
        this.url_type = url_type;
        this.url = url;
        this.img = img;
        this.img_brt = img_brt;
        this.body = body;
    }
}

export const contents = [
    new Content("Tapaz", "学生の視点を用いて経営者と新しい価値を提案する事業活動", new Date(2024, 11, 11), ["Business"], "Note", "https://note.com/tapaz", "src/assets/img/tapaz_work.jpg", 0.6, <div></div>),
    new Content("DCON", "介護業界の業務の質を向上させるサービス提供活動", new Date(2025, 10, 25), ["Activity", "Business"], null, null, "src/assets/img/dcon_mtg.jpg", 0.8, <div></div>),
]