'use client'

// react-dependencies
import { FC } from 'react';

// MUI
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';

// project's styles/img
import './product-review.scss'


interface IProductReview {
    username: string,
    text: string,
    rating: number
}


const ProductReview: FC<IProductReview> = ({
    username,
    text,
    rating
}): JSX.Element => {



    return (
        <div className="review">
            <div className="review__user">
                <h6>{username}</h6>
                <Rating className='stars' name="read-only" value={rating} precision={0.5} readOnly />
            </div>
            <p>{text}</p>

            <Divider/>
        </div>
    )
}

export default ProductReview