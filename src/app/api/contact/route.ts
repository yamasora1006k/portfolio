import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
    name?: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate required fields
        if (!body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // TODO: Integrate with email service (SendGrid, Resend, etc.)
        // For now, just log and return success
        console.log('Contact form submission:', {
            name: body.name || 'Anonymous',
            email: body.email,
            subject: body.subject,
            message: body.message,
            timestamp: new Date().toISOString(),
        });

        // In production, you would:
        // 1. Send email notification
        // 2. Save to database
        // 3. Send to Slack/Discord

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
