import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { totalPrice, orderId } = await req.json();

        const authHeader = 'Basic ' + Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_API_KEY}`).toString('base64');

        console.log('Request body:', JSON.stringify({
            amount: {
                value: totalPrice.toFixed(2), // Строка с двумя знаками после запятой,
                currency: 'RUB',
            },
            capture: true,
            description: `Оплата заказа ${orderId}`,
            metadata: { 
                order_id: orderId 
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_CALLBACK_URL,
            },
        }, null, 2));

        const paymentResponse = await fetch('https://api.yookassa.ru/v3/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': crypto.randomUUID(),
                'Authorization': authHeader,
            },
            body: JSON.stringify({
                amount: {
                    value: totalPrice.toFixed(2),
                    currency: 'RUB',
                },
                capture: true,
                description: `Оплата заказа ${orderId}`,
                metadata: { 
                    order_id: orderId 
                },
                confirmation: {
                    type: 'redirect',
                    return_url: process.env.YOOKASSA_CALLBACK_URL,
                },
            }),
        });

        if (!paymentResponse.ok) {
            console.log('PAYMENT ERROR:', paymentResponse.status);
            return NextResponse.json({ error: `Ошибка создания платежа: ${paymentResponse.status}` });
        }

        console.log('PAYMENT RESPONSE:', paymentResponse);

        const paymentData = await paymentResponse.json();
        return NextResponse.json(paymentData);


    } catch (error) {
        return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
