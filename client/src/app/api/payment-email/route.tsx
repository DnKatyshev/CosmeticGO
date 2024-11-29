import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import PaymentEmail from '@/email-templates/payment-email/PaymentEmail';

export async function POST(req: Request) {
    try {
        const { user, orderId, totalPrice, address,  email } = await req.json();

        // Рендеринг email-шаблона
        const emailHtml = await render(<PaymentEmail user={user} orderId={orderId} totalPrice={totalPrice} address={address} />);

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
            subject: 'Оплата заказа на CosmeticGO',
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
