'use client'

// react-dependencies
import { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
//import queryString from 'query-string'

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import { Topbar } from '@/components/business/topbar/Topbar';
import { Sidebar } from '@/components/business/sidebar/Sidebar';
import ProductGroupCategories from '@/components/business/productGroupCategories/ProductGroupCategories';

// Server
import { ProductsApi } from '../orval-api';

// types (ZOD + TS)
import { ProductsDataSchema } from '../../../types/types';

// project's styles/img
import Preloader from '../../assets/icons/preloader.svg'
import './catalog.scss'



const categories = [
    { name: 'Тушь', id: 1 },
    { name: 'Помада', id: 2 },
    { name: 'Карандаши', id: 3 },
    { name: 'Консиллеры', id: 4 },
    { name: 'Маски', id: 5 },
    { name: 'Шампуни', id: 6 },
    { name: 'Туалетная вода', id: 7 },
];

const countries = [
    { name: 'Южная Корея', id: 1, },
    { name: 'Франция', id: 2, },
    { name: 'ОАЭ', id: 3, },
    { name: 'Швейцария', id: 4, },
    { name: 'Россия', id: 5, }
]

const Catalog: FC = (): JSX.Element => {

    const { vegan, minPrice, maxPrice, catalogCountryId, sort } = useZustandStore((state) => state.catalogQueryParams);
    
    const {data, isFetching} = ProductsApi.useGetAllOrFilteredProducts({// возвращает {status: 200, data: {}}
        minPrice,
        maxPrice,
        countryId: catalogCountryId.join(','),
        vegan,
        sort
    })


    const products = data && data.data.result // хук(запрос) возвращает объект {status: 200, data: {result: наши продукты}} - вырыжаем из него массив result
    
    // Zod-проверка
    const zodValidation = ProductsDataSchema.safeParse(products);


    const reducedProducts = products && products.reduce((acc, product) => {

        const categoryId = product.category?.id

        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }

        acc[categoryId].push(product)

        return acc  // вид итогого объекта: {1: [продукт], 2: [продукт]} - и так мы имеем объект, где ключи - category.id, а значения - сами продукты
    }, {})



    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            {/* Валидируем данные, которые вернул запрос - соответствуют ли они нашей ZOD-схеме */}
            {
                <section className="catalog">
                    <div className="catalog__body">

                        <Topbar categories={categories}/>

                        <div className="catalog__main">

                            <Sidebar countries={countries}/>

                            {
                                isFetching

                                            ?

                                <Preloader className='preloader'/>

                                            :

                                <div className="catalog__products">
                                    {
                                        reducedProducts && Object.entries(reducedProducts).map(([categoryId, products], id) => (
                                            <ProductGroupCategories 
                                                categoryId={categoryId} 
                                                products={products}
                                                key={id}
                                            />
                                        ))
                                    }
                                </div>
                            }

                        </div>

                    </div>
                </section>
            }

            
        </motion.main>
    )
}

export default Catalog;