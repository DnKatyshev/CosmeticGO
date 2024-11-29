import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import ActivateEmail from '@/email-templates/activate-email/ActivateEmail';

export async function POST(req: Request) {
    try {
        const { username, email, activateCode } = await req.json();

        // Рендеринг email-шаблона
        const emailHtml = await render(<ActivateEmail username={username} activateCode={activateCode} />);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const sending = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Активация аккаунта CosmeticGO',
            html: emailHtml
        });

        if (sending) {
            return NextResponse.json({ message: 'Письмо отправлено!' });
        }

    } catch (error) {
        console.error('Ошибка отправки письма:', error);
        return NextResponse.json({ error: 'Ошибка сервера при отправке письма' }, { status: 500 });
    }
}
