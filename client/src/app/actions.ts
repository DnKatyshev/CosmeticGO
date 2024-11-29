"use server"

// types
import { TRegisterForm } from "@/components/business/registerForm/register-form";
import { TLoginForm } from "@/components/business/loginForm/login-form";
import { PaymentData } from "../../types/types";


export const signUpAction = async (signUpData: TRegisterForm) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData)
        })
        if (!response.ok) {
            return { status: 409 };
        }

        return { status: 200 };

    } catch (error: any) {
        return { status: 400 };
    }
}

export const signUpVerifyCode = async (verifyCode: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/signup/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verifyCode)
        })
        if (!response.ok) {
            return { status: 400 };
        }

        return { status: 200 };

    } catch (error: any) {
        return { status: 400 };
    }
}


export const signInAction = async (signInData: TLoginForm) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signInData)
        })
        if (!response.ok) {
            return { status: 409 };
        }

        return { status: 200 };

    } catch (error: any) {
        return { status: 400 };
    }
}


export const changeDiscountStatus = async (username: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/discount-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
    })

    if (!response.ok) {
        return { status: 403 };
    }

    return { status: 200 };

    } catch (error: any) {
        return { status: 400 };
    }
}


export const getProfileInfo = async (username: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/get-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
    })

    if (!response.ok) {
        return { status: 403 };
    }

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}



export const addToCart = async (productId: string, user: string, quantity: number) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, user, quantity})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}


export const removeFromCart = async (productId: string, user: string, quantity: number) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/remove-from-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, user, quantity})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}


export const getCart = async (user: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/get-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}


// запрос к Яндекс API Геокодер для получения адреса по координатам
export const getAddress = async (lon: number, lat: number) => {
    try{
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.GEO_KEY}&geocode=${lon},${lat}&format=json`, {
    })
 
     return response.json()
 
     } catch (error: any) {
         return { status: 400 };
     }
}

export const setAddress = async (username: string, exactAddress: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/set-address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, exactAddress})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}


// Добавление товаров в модель Order, для дальнейшей оплаты
export const createOrder = async (productId: string, quantity: number, user: string, email: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, quantity, user, email})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}

export const getOrder = async (user: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/get-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}

export const removeFromOrder = async (productId: string, user: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/remove-from-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, user})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}


export const finishOrder = async (user: string, address: string, comment: string) => {

    // Делаем запрос к БД, нам приходят нужные поля - их передаём в createPayment(), выражаем из него URL, возвращаем этот URL и делаем редирект(оплату)
    // Затем удаляем products из Cart/Orders и добавляем в модель PaidOrder

    // Добавляем доп.данные в модель Order и возвращаем её данные
    const response = await fetch('http://localhost:8000/server-side/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, address, comment})
    })

    const finalOrderData = await response.json()
    const {totalPrice, _id: orderId,  email} = finalOrderData.result


    // Создаём YOOKASSA-платёж через ROUTE-HANDLER
    const payment = await fetch('http://localhost:3000/api/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalPrice, orderId }),
    });

    if (!payment.ok) {
        throw new Error(`Ошибка создания платежа: ${payment.status}`);
    }
    const paymentData: PaymentData = await payment.json();
    


    // Удаляем товары из модели Order, из Cart, добавляем в модель PaidOrder
    const yookassaId = paymentData.id;
    await fetch('http://localhost:8000/server-side/create-paid-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, totalPrice, yookassaId})
    })


    // отправляем письмо об успешном платеже ( запрос на Route-Handler )
    await fetch('http://localhost:3000/api/payment-email', {
        method: 'POST',
        body: JSON.stringify({ user, orderId, totalPrice, address,  email }),
        headers: { 'Content-Type': 'application/json' },
    });


    return paymentData.confirmation.confirmation_url; // URL для оплаты
}


export const getPaidOrder = async (user: string) => {

    try{
       const response = await fetch('http://localhost:8000/server-side/get-paid-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
    })

    return response.json()

    } catch (error: any) {
        return { status: 400 };
    }
}