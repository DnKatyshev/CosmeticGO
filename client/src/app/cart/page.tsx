'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {toast, Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation';

// Server-actions
import { getCart, addToCart, removeFromCart, createOrder } from '../actions';

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import MainLink from '@/ui/Link/Link';
import Button from '@/ui/Button/Button';
import Preloader from '../../assets/icons/preloader.svg'
import { MainCheckbox } from '@/ui/MainCheckbox/MainCheckbox';
import { CartProduct } from '@/components/business/cartProduct/CartProduct';

// MUI-components

// types (ZOD + TS)

// project's styles/img
import NoCartIcon from '@/assets/icons/no-reviews.svg'
import './cart.scss'



const Cart: FC = (): JSX.Element => {

    const {data: session, status} = useSession()
    const [cartState, setCartState] = useState<any>()
    const [cartLoading, setCartLoading] = useState(false)
    const [cartProductsLoading, setCartProductsLoading] = useState(false)


    const [email, setEmail] = useState<string | undefined>();

    let user:string;
    const getUserCart = async () => {
        if (session) {
            user = session?.user.name || session?.user.username

            setCartLoading(true)
            const cart = await getCart(user)
            setCartLoading(false)

            setCartState(cart.result)
            setEmail(session.user.email)
        }
    }

    useEffect(() => {
        getUserCart()
    }, [session, cartProductsLoading])


    // добавляем в store totalPrice для отображения в header-e / устанавливаем boolean-статус для отображения всех чекбоксов
    const {cartTotalPrice, setCartTotalPrice, productCheckboxes} = useZustandStore(state => state)
    const moveToCartByIcon = async (productId: string, user: string, quantity: number) => {
        try {
            setCartProductsLoading(true)

            let response;
            if(quantity === 1){
                response = await addToCart(productId, user, quantity);
            }
            else if(quantity === -1){
                response = await removeFromCart(productId, user, quantity);
            }
            console.log('RESPONSE - ', response)

            setCartProductsLoading(false)

            setCartTotalPrice(response.result.totalPrice)

            if(response.result && quantity === 1){
                toast.success('Товар добавлен в корзину!', {duration: 6000})
            }
            else if(response.result && quantity === -1){
                toast.success('Товар удалён из корзины!', {duration: 6000})
            }
            return response;
        } catch (error: any) {
            return { status: 400 }
        }
    }


    // Функция для удаления всех выбранных ЧЕКБОКСОВ (товаров)
    const handleRemoveSelected = async () => {
        setCartProductsLoading(true)

        const response = await Promise.all(
            productCheckboxes
                .filter((item) => item.isChecked)
                .map(({ productId, user, quantity }) =>
                    removeFromCart(productId, user, quantity)
                )
        );
        console.log('RESPONSE - ', response)

        // Обновляем состояние корзины
        await getUserCart();

        // устанавливаем totalPrice в Store
        setCartTotalPrice(response.at(-1).result.totalPrice || 0)

        setCartProductsLoading(false)

        toast.success('Выделенные товары удалены!', {duration: 6000})
    };


    // отпрвляем данные для MainCheckbox
    let productIds
    let quantities
    if(cartState){
        productIds = cartState.products.map((item:any) => item.product._id)
        quantities = cartState.products.map((item:any) => item.quantity)
    }



    // CREATE-ORDER
    console.log('EMAIL - ', email)
    const router = useRouter()
    const handleCreateOrder = async () => {
        const response = await Promise.all(
            productCheckboxes
                .filter((item) => item.isChecked)
                .map(({ productId, user, quantity }) =>
                    createOrder(productId, quantity,  user, email)
                )
        );
        router.push('/payment')
    }


    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            <section className="cart">
                <div className="cart__body">
                    
                    <h1 className="cart__title">Корзина</h1>

                    {
                        cartLoading
                                            ?
                        <Preloader className='preloader'/>
                                            :
                        cartState && !cartState.user
                                            ?
                        <div className="cart-empty">
                            <NoCartIcon/>
                            <h1>Войдите в аккаунт</h1>
                        </div>
                                            :
                        cartState && cartState.products.length > 0
                                            ?
                        <div className="cart__main">

                            <div className="cart__products">
                                <div className="cart__select">
                                    <MainCheckbox 
                                        productsCount={cartState && cartState.products.length}
                                        productIds={productIds && productIds}
                                        user={cartState && cartState.user}
                                        quantities={quantities && quantities}
                                    />
                                    <Button text='Удалить' className='cart__remove-btn' callback={() => handleRemoveSelected()}/>
                                </div>
                                <div className="cart__products-list">
                                    {
                                        cartProductsLoading
                                                        ?
                                        <Preloader className='preloader'/>
                                                        :
                                        cartState && cartState.products.map((item:any, index:number) => (
                                            <CartProduct 
                                                key={index} 
                                                index={index}
                                                {...item.product}

                                                user={cartState.user}
                                                quantity={item.quantity}

                                                moveToCartByIcon={(productId: string, user: string, quantity: number) => moveToCartByIcon(productId, user, quantity)}
                                            />
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="cart__dashboard">
                                <h2 className='cart__dashboard-title'>Ваша корзина:</h2>
                                <ul className="cart__dashboard-list">
                                    <li className="cart__dashboard-li">
                                        <h6>Стоимость</h6>
                                        <p>{cartState && cartState.totalPrice}₽</p>
                                    </li>
                                    <li className="cart__dashboard-li">
                                        <h6>Со скидочной картой</h6>
                                        <p>{cartState && (cartState.totalPrice * .8).toFixed()}₽</p>
                                    </li>
                                </ul>
                                <Button text="Оформить заказ" className='cart__dashboard-btn' callback={() => handleCreateOrder()}/>
                            </div>
                        </div>
                                            :
                        <div className="empty-page">
                            <NoCartIcon/>
                            <h1>Пустая корзина</h1>
                        </div>
                    }


                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />

                </div>
            </section>
            
        </motion.main>
    )
}

export default Cart;