'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Zustand
import useCartStore from '@/store/zustandStore';

// MUI
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// project's styles/img
import './cart-btn.scss'


const CartButton: FC = (): JSX.Element => {

    const cartTotalPrice = useCartStore(state => state.cartTotalPrice)

    return (
        <Link href='/cart' className="cart-btn">
            <p>{cartTotalPrice}₽</p>
            <span></span>
            <ShoppingBagIcon sx={{ color: '#000', fontSize: 35 }}/>
        </Link>
    )
}

export default CartButton