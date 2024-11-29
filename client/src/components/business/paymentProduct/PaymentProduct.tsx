'use client'

// react-dependencies
import { FC } from 'react';

// Server-actions
import { removeFromOrder } from '@/app/actions';

// Zustand

// Components
import Button from '@/ui/Button/Button';

// MUI-components
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Divider from '@mui/material/Divider';

// types (ZOD + TS)

// project's styles/img
import './payment-product.scss'

interface IPaymentProduct {
    key: number,
    _id: string,
    user: string,
    name: string,
    photos: string[],
    price: number,
    discountPrice: number,
    vegan: boolean,
    quantity: number,
    removeFromOrderHandle: (productId: string, user: string) => void
}


export const PaymentProduct: FC<IPaymentProduct> = ({
    key,
    _id,
    user,
    name,
    photos,
    price,
    discountPrice,
    vegan,
    quantity,
    removeFromOrderHandle
}): JSX.Element => {





    return (
        <div className="payment-product" key={key}>
            <div className="payment-product__main">

                <div className="payment-product__info">
                    <img src={photos[0]} alt="" />
                    <h2 className="payment-product__name">{name}</h2>
                    <span>{vegan ? 'Vegan' : ''}</span>
                </div>

                <p className="payment-product__price">{price}₽</p>

                <p className="payment-product__quantity">x{quantity}</p>

                <Button 
                    text={<DeleteForeverRoundedIcon/>}
                    className='payment-product__remove'
                    callback={() => removeFromOrderHandle(_id, user)}
                />
                
            </div>
            <Divider/>
        </div>
    )
}
