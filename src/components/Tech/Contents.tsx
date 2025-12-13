import type { JSX } from "react";

export class Content {
    title: string;
    description: string;
    create_at: Date;
    tag: string[];
    url_type: string;
    url: string;
    img: string;
    img_brt: number;
    body: JSX.Element;


    constructor(title: string, description: string, create_at: Date, tag: string[], url_type: string, url: string, img: string, img_brt: number, body: JSX.Element) {
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
    new Content("Routepia", "人生足跡記録アプリ", new Date(2025, 4, 23), ["Native"], "GitHub", "https://github.com/LIZ-Development/Routepia", "src/assets/img/routepia.jpg", 0.6, <div></div>),
    new Content("Snipe me", "Cubeを貫くパズルゲーム", new Date(2025, 11, 9), ["Web"], "GitHubPages", "https://t0rixs.github.io/snipeme/", "src/assets/img/snipeme.png", 0.7, <div></div>),
    new Content("Togo", "飛行機/高速バスの予約管理ツール", new Date(2025, 8, 1), ["Web"], "GitHubPages", "https://t0rixs.github.io/Togo/", "src/assets/img/togo.png", 0.7, <div></div>),
    new Content("PocketReception", "無人図書館のための蔵書管理ツール", new Date(2024, 9, 14), ["Web"], "GitHub", "https://github.com/t0rixs/PocketReception", "src/assets/img/pocketreception.jpg", 0.6, <div></div>),
    new Content("Portfolio", "これ", new Date(2024, 12, 13), ["Web"], "GitHub", "https://github.com/t0rixs/Portfolio", "src/assets/img/pocketreception.jpg", 0.6, <div></div>),
]