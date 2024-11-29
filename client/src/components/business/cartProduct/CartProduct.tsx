'use client'

// react-dependencies
import { FC } from 'react';

// Server-actions
import { addToCart } from '@/app/actions';

// Zustand

// Components
import { ProductCheckbox } from '@/ui/ProductCheckbox/ProductCheckbox';

// MUI-components
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// types (ZOD + TS)

// project's styles/img
import './cart-product.scss'

interface ICartProduct {
    key: number,
    index: number,
    _id: string,
    name: string,
    photos: string[],
    price: number,
    discountPrice: number,
    vegan: boolean,

    user: string,
    quantity: number,

    moveToCartByIcon: (productId: string, user: string, quantity: number) => void
}


export const CartProduct: FC<ICartProduct> = ({
    key,
    index,
    _id,
    name,
    photos,
    price,
    discountPrice,
    vegan,

    user,
    quantity,

    moveToCartByIcon
}): JSX.Element => {


    return (
        <div className="product-cart" key={key}>

            <ProductCheckbox 
                index={index}
                label=""
                productId={_id}
                username={user}
                quantity={quantity}
            />

            <img src={photos[0]} alt="" />

            <div className="product-cart__info">
                <p>{name}</p>
                {vegan ? <span>Vegan</span> : ''}
            </div>

            <div className="product-cart__price">
                <h3 className="price-1">{discountPrice}₽</h3>
                <h3 className="price-2">{price}₽</h3>
            </div>

            <div className="product-cart__quantity">
                <button 
                    className="quantity-icon"
                    onClick={() => moveToCartByIcon(_id, user, -1)}
                >
                    <RemoveRoundedIcon/>
                </button>
                <input type="number" className="quantity-input" readOnly value={quantity}/>
                <button 
                    className="quantity-icon"
                    onClick={() => moveToCartByIcon(_id, user, 1)}
                >
                    <AddRoundedIcon/>
                </button>
            </div>

        </div>
    )
}
