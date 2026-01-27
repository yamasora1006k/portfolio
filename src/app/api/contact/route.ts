import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
    name?: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // 必須項目のバリデーション
        if (!body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // メールアドレス形式のバリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // 環境変数のチェック
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;

        if (!gmailUser || !gmailPass) {
            console.error('Gmail credentials not found in environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Nodemailerトランスポーターの作成
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPass,
            },
        });

        // メールの内容
        const mailOptions = {
            from: gmailUser, // 送信元（自分のGmail）
            to: 'yamaguchisora1006@gmail.com', // 送信先（自分）
            replyTo: body.email, // 返信先（問い合わせてきたユーザー）
            subject: `[Portfolio Contact] ${body.subject}`, // 件名
            text: `
Name: ${body.name || 'Anonymous'}
Email: ${body.email}
Subject: ${body.subject}

Message:
${body.message}
            `,
            html: `
<h3>New Contact Message</h3>
<p><strong>Name:</strong> ${body.name || 'Anonymous'}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Subject:</strong> ${body.subject}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${body.message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // メールの送信
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', {
            recipient: 'yamaguchisora1006@gmail.com',
            subject: body.subject,
        });

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
