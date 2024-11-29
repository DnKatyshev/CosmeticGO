'use client'

// react-dependencies
import { FC } from 'react';

// Server-actions

// Zustand

// Components
import Button from '@/ui/Button/Button';

// MUI-components
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Divider } from '@mui/material';

// types (ZOD + TS)

// project's styles/img
import './paid-order.scss'

interface IPaidOrder {
    key: number,
    paymentId: string,
    oneOrder: any
}


export const PaidOrder: FC<IPaidOrder> = ({
    key,
    paymentId,
    oneOrder
}): JSX.Element => {


    console.log('====OneOrder:==== ', oneOrder)

    const paidOrderPrice = oneOrder.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0)


    return (
        <div className="paid-order" key={key}>

            <h3 className="paid-order__title">Заказ: {paymentId}</h3>

            <div className="paid-order__main">
                <AvatarGroup max={3}>
                    {
                        oneOrder.map((item: any) => (
                            <Avatar alt={item.product.name} src={item.product.photos[0]} sx={{ width: 70, height: 70 }} />
                        ))
                    }
                </AvatarGroup>
                <h3>
                    {paidOrderPrice}₽
                </h3>
            </div>

            <div className="paid-order__buttons">
                <span className="paid-order__status">В ДОСТАВКЕ</span>
                <Button text={'Отменить'} className='paid-order__cancel' callback={() => {}}/>
            </div>

            <Divider/>
        </div>
    )
}
