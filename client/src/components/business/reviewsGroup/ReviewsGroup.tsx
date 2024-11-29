'use client'

// react-dependencies
import { FC, useEffect, useState } from 'react';

// Components
import ProductReview from '../productReview/ProductReview';
import MainLink from '@/ui/Link/Link';

// MUI-components
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';

// types (ZOD + TS)

// project's styles/img
import NoReviews from '@/assets/icons/no-reviews.svg'
import './reviewsGroup.scss'

interface IReviews {
    reviews: [{
        product_id: string,
        username: string,
        text: string,
        rating: number,
    }]
    productId: number
}


const ReviewsGroup:FC<IReviews> = ({reviews, productId}): JSX.Element => {

    // Вычисляем средний рейтинг - складываем все оценки и делим на их количество
    const reviewsRatingSum = reviews && reviews.reduce((acc, review) => {
        return acc + review.rating
    }, 0)

    const [avarageRating, setAvarageRating] = useState('')
    useEffect(() => {
        if(reviews){
            const score = (reviewsRatingSum / reviews.length).toFixed(2)
            setAvarageRating(score)
        }
    }, [reviews])
    

    return (
        <section className="reviews">
            <div className="reviews__body">
                <h1 className="reviews__title">Рейтинг и отзывы</h1>
                {

                    reviews && reviews.length > 0
                                                            ?
                    <>
                    <div className="reviews__info">
                        <div className="reviews__rating">
                            <h2 className="reviews__rating-number">{avarageRating}</h2>
                            <Rating className='stars' name="read-only" value={String(avarageRating)} precision={0.5} readOnly />
                        </div>
                        <div className="reviews__amount">
                            <h2>Отзывы:</h2>
                            <p>{reviews && reviews.length}</p>
                        </div>
                    </div>

                    <MainLink href={`/create-review/${productId}`} text={'Оставить отзыв'} className={'reviews__btn'} />

                    <div className="reviews__main">
                        {
                            reviews.map((review) => (
                                <ProductReview 
                                    username={review.username}
                                    text={review.text}
                                    rating={review.rating}
                                />
                            ))
                        }
                    </div>
                    </>
                                                            :
                    <div className="reviews__no-reviews">
                        <MainLink href={`/create-review/${productId}`} text={'Оставить отзыв'} className={'reviews__btn'} />
                        <NoReviews/>
                        <h1>Пока нет отзывов</h1>
                    </div>
                }
            </div>
        </section>
    )
}

export default ReviewsGroup