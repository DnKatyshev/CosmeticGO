'use client'

// react-dependencies
import { FC } from 'react';
import Link from 'next/link';

// MUI
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';

// project's styles/img
import './user-review.scss'
import { Londrina_Sketch } from 'next/font/google';


interface IUserReview {
    username: string
    text: string
    rating: number
    productId: string
    productImage: string
    productName: string
    productPrice: number
}


const UserReview: FC<IUserReview> = ({
    username,
    text,
    rating,
    productId,
    productImage,
    productName,
    productPrice
}): JSX.Element => {



    return (
        <div className="review">
            <Link href={`/product/${productId}`} className="review__product-info">
                <img src={productImage} alt="" />
                <div className="review__product-text">
                    <h2>{productName}</h2>
                    <p>{productPrice}₽</p>
                </div>
            </Link>

            <div className="review__user-info">
                <div className="review__user-rating">
                    <h6>{username}</h6>
                    <Rating className='stars' name="read-only" value={rating} precision={0.5} readOnly />
                </div>
                <p>{text}</p>
            </div>

            <Divider/>
        </div>
    )
}

export default UserReview