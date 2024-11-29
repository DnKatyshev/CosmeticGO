'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {toast, Toaster} from 'react-hot-toast'

// Server
import { ProductsApi, ReviewsApi } from '@/app/orval-api';
import { addToCart } from '@/app/actions';

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import { FavoriteCheckbox } from '@/ui/FavoriteIcon/FavoriteIcon';
import MuiTabs from '@/components/widgets/ReviewsTabs/MuiTabs';
import ReviewsGroup from '@/components/business/reviewsGroup/ReviewsGroup';
import Button from '@/ui/Button/Button';
import Preloader from '../../../assets/icons/preloader.svg'

// MUI-components
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Skeleton from '@mui/material/Skeleton';

// types (ZOD + TS)

// project's styles/img
import './product.scss'

export interface IProduct {
    _id: number,
    name: string,
    price: number,
    discountPrice: number,
    category: {
        name: string,
        id: number
    },
    brand: string,
    volume: number,
    weight: number,
    description: string,
    ingredients: string,
    photos: string[],
    reviews: string[],
    country: {
        name: string,
        id: number
    },
    rating: number,
    vegan: boolean,
}


const Product: FC = (): JSX.Element => {

    // Получение ТОВАРОВ из запроса через Orval react-query хук
    const pathname = usePathname()
    const productId = pathname.split('/')[2]
    const {data: products, isFetching} = ProductsApi.useGetOneProduct(productId)
    const productData:IProduct = products?.data.result[0]  // нам приходит массив с 1м продуктом - выражаем их

    // Получение ОТЗЫВОВ из запроса через Orval POST react-query хук
    const { mutate: getReviews, data: reviews, error } = ReviewsApi.useGetReviews();
    useEffect(() => {
        if (productData?.reviews) {
            getReviews({ data: {reviewsIds: productData.reviews, withProductsFlag: true} });
        }
    }, [productData]);
    const reviewsData = reviews?.data.result


    // state для того чтобы задавать SRC главному изображению
    const [mainImgSrc, setMainImgSrc] = useState()
    useEffect(() => {
        if (!isFetching && productData?.photos[0]) {
          setMainImgSrc(productData.photos[0]);
        }
    }, [isFetching, productData]);


    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //console.log('productData ', productData)


    // Логика добавления товара в корзину для ЗАРЕГИСТРИРОВАННОГО пользователя
    const {data: session, status} = useSession()
    let user:string
    if(session?.user){
        user = session?.user.name || session?.user.username
    } 

    // zustand-функция для записи totalPrice в Store
    const {setCartTotalPrice, cartTotalPrice} = useZustandStore((state) => state)

    const [cartButtonLoading, setCartButtonLoading] = useState(false)
    const [isCartButtonDone, setIsCartButtonDone] = useState(false)

    const addToCartHandler = async () => {

        if(user){

            setCartButtonLoading(true)
    
            const cart = await addToCart(productId, user, 1)
            setCartTotalPrice(cart.result && cart.result.totalPrice)
    
            setCartButtonLoading(false)
            setIsCartButtonDone(true)

            if(cart){
                toast.success('Товар добавлен в корзину!', {duration: 6000})
    
            } else {
                toast.error('Oшибка при добавлении в корзину!', {duration: 6000})
            }
        }
        else {
            toast.error('Вы не зарегистрированы!', {duration: 6000})
        }


    }

    

    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            {isFetching 
                            ?
            <Preloader className='preloader'/>
                            :
            productData
                            ?
            <section className="product">
                <div className="product__body">

                <div className="product__top">
                    <div className="image-container">
                        <Image
                            src={mainImgSrc}
                            alt='Изображение товара в каталоге'
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="product__small-images">
                            {
                                productData.photos.map((image) => (
                                    <div><img src={image} alt="" onClick={() => setMainImgSrc(image)} /></div>
                                ))
                            }
                        </div>
                    </div>


                    <div className="product__main-info">
                        <h1 className="product__name">
                            {productData.name}
                        </h1>
                        <Rating className='stars' name="read-only" value={productData.rating} precision={0.5} readOnly />
                        <Divider/>
                        <div className="product__prices">
                            <div className="product__main-price">
                                <h3>{productData.discountPrice}₽</h3>
                                <p>Со скидочной картой</p>
                            </div>
                            <div className="product__discount-price">
                                <h3>{productData.price}₽</h3>
                                <p>Без скидки</p>
                            </div>
                        </div>
                        <div className="product__commercial">
                            <InfoIcon/>
                            <p>Авторизуйся и получай бонусы!</p>
                        </div>
                        <div className="product__buttons">
                            {
                                cartButtonLoading
                                                    ?
                                <Skeleton variant="rounded" width={180} height={51} />
                                                    :
                                <Button 
                                    text={isCartButtonDone ? 'Добавить ещё' : 'В корзину'} 
                                    className={isCartButtonDone ? 'product__cart-button done' : 'product__cart-button'} 
                                    callback={() => addToCartHandler()}
                                />
                            }
                        </div>
                    </div>
                </div>
                
                <MuiTabs productData={productData}/>

                <ReviewsGroup reviews={reviewsData} productId={productData._id}/>

                </div>
            </section>
                        : ''
            
        }

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            
        </motion.main>
    )
}

export default Product;