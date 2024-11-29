'use client'

// react-dependencies
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@reactuses/core'

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import CatalogProduct from '../catalogProduct/CatalogProduct';

// types (ZOD + TS)
import { TProductsData } from '../../../../types/types';

// project's styles/img
import './productGroupCategories.scss'


const ProductGroupCategories = ({categoryId, products} : {categoryId: number, products: TProductsData}): JSX.Element => {

    const {setCategoryTabsId, categoryTabsId} = useZustandStore((state) => state)
    const intersectionRef = useRef(null);
    const intersection = useIntersectionObserver(
        intersectionRef,
        ([entry]) => {
            // Проверяем, что элемент полностью виден на экране
            if (entry.isIntersecting && categoryTabsId !== categoryId) {
                console.log("Updating categoryTabsId to:", categoryId);  // Лог для проверки
                setCategoryTabsId(categoryId);
            }
        },
        {
            threshold: .1,
            rootMargin: "0px 0px 0% 0px"
        }
      );


    return (
        <div className="product-group" ref={intersectionRef} id={String(categoryId)}>

            <h1 className="product-group__title">{products[0].category.name}</h1>

            <div className="product-group__body">
                {
                    products.map((product, id) => (
                        <CatalogProduct
                            name={product.name}
                            mainImg={product.photos[0]}
                            mainPrice={product.price}
                            discountPrice={product.discountPrice}
                            vegan={product.vegan}
                            rating={4}
                            link={product._id}
                            key={id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductGroupCategories;