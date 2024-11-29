// react-dependencies
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Zustand

// MUI-components
import Rating from '@mui/material/Rating';

// types (ZOD + TS)

// project's styles/img
import './catalogProduct.scss'

interface ICatalogProduct {
    name: string,
    mainImg: string,
    mainPrice: number,
    discountPrice: number,
    vegan: boolean,
    rating: number,
    link: string,
}


const CatalogProduct: FC<ICatalogProduct> = ({
    name,
    mainImg,
    mainPrice,
    discountPrice,
    vegan,
    rating,
    link,
}): JSX.Element => {


    return (
        <Link href={`product/${link}`} className="catalog-product">

            <div className="image-container">
                <Image
                    src={mainImg}
                    alt='Изображение товара в каталоге'
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className="catalog-product__info">
                <h1 className="catalog-product__name">{name}</h1>

                <Rating className='catalog-product__rating' name="read-only" value={rating} precision={0.5} readOnly />

                <div className="catalog-product__price">
                    <h3>{discountPrice}₽</h3>
                    <p>{mainPrice}₽</p>
                </div>

            </div>

            {vegan === true ? <span className="catalog-product__vegan">Веган</span> : ''}

        </Link>
    )
}

export default CatalogProduct;