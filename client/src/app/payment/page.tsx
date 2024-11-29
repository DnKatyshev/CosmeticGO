'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster} from 'react-hot-toast'
import { useSession } from 'next-auth/react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import debounce from 'lodash.debounce';

// Server-actions
import { getOrder, removeFromOrder, finishOrder } from '../actions';

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import { PaymentProduct } from '@/components/business/paymentProduct/PaymentProduct';
import Button from '@/ui/Button/Button';
import Preloader from '../../assets/icons/preloader.svg'

// MUI-components

// types (ZOD + TS)

// project's styles/img
import NoPaymentIcon from '@/assets/icons/no-reviews.svg'
import './payment.scss'



const Payment: FC = (): JSX.Element => {

    const {data: session, status} = useSession()
    const [orderState, setOrderState] = useState<any>()
    const [orderLoading, setOrderLoading] = useState(false)

    let user
    const getUserOrder = async () => {
        if (session) {
            user = session?.user.name || session?.user.username

            setOrderLoading(true)
            const order = await getOrder(user)
            setOrderLoading(false)

            setOrderState(order.result)
        }
    }

    useEffect(() => {
        getUserOrder()
    }, [session])


    // Достаём точный адрес, который мы записали ранее - в Profile
    const {userAddress, setUserAddress, setCartTotalPrice} = useZustandStore((state) => state)

    console.log("Address:", userAddress);


    const [textareaValue, setTextareaValue] = useState('')
    const handleChange = debounce((event) => {
        setTextareaValue(event.target.value)
    }, 500)


    // Удаление товара из заказа
    const removeFromOrderHandle = async (productId: string, user: string) => {
        removeFromOrder(productId, user)
        await getUserOrder()
    }



    // ОПЛАТА ЗАКАЗА, УДАЛЕНИЕ ОПЛАЧЕННЫХ ТОВАРОВ ИЗ CART
    const handleCreatePayment = async () => {
        try{
            setOrderLoading(true)
            const paymentUrl = await finishOrder(orderState.user, userAddress.exactAddress, textareaValue)
            setOrderLoading(false)
    
            toast.error('Заказ успешно оплачен!', {
                icon: '✅',
            });
    
            // Redirect пользователя для оплаты
            location.href = paymentUrl;

            // Если оплата успешная - обнуляем цену в header-e (там она через zustand, а не черех запрос)
            setCartTotalPrice(0)
        }
        catch (err) {
            console.log(err);
            toast.error('Ошибка оплаты!', {
                icon: '❌',
            })
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

            <section className="payment">
                <h1 className="payment__title">Оформление заказа</h1>

                    {

                        orderLoading
                                                                            ?
                        <Preloader className='preloader'/>
                                                                            :
                        orderState && orderState.products.length > 0
                                                                            ?
                        <div className="payment__body">

                            <div className="payment__main">
                                <div className="payment__products-list">
                                    {
                                        orderState && orderState.products.map((item:any, index:number) => (
                                            <PaymentProduct 
                                                key={index} 

                                                {...item.product}

                                                user={orderState.user}
                                                quantity={item.quantity}
                                                removeFromOrderHandle={removeFromOrderHandle}
                                            />
                                        ))
                                    }
                                </div>

                                <div className="payment__address">
                                    <AddressSuggestions 
                                        token={process.env.NEXT_PUBLIC_DADATA_KEY} 
                                        value={userAddress.exactAddress} 
                                        defaultQuery={userAddress.exactAddress}
                                        onChange={(value) => {
                                            console.log("Selected Address:", value);
                                            setUserAddress(value?.value, value?.value);
                                        }}
                                        delay={500} 
                                    />
                                    <textarea 
                                        onChange={(event) => handleChange(event)}
                                        className='payment__textarea'
                                    />
                                </div>
                            </div>

                            <div className="payment__dashboard">
                                <h2 className='payment__dashboard-title'>Итого:</h2>
                                <ul className="payment__dashboard-list">
                                    <li className="payment__dashboard-li">
                                        <h6>Стоимость:</h6>
                                        <p>{orderState && orderState.totalPrice}₽</p>
                                    </li>
                                    <li className="payment__dashboard-li">
                                        <h6>Со скидкой:</h6>
                                        <p>{orderState && (orderState.totalPrice * .8).toFixed()}₽</p>
                                    </li>
                                    <li className="payment__dashboard-li">
                                        <h6>Доставка:</h6>
                                        <p>БЕСПЛАТНО</p>
                                    </li>
                                </ul>
                                <Button text="Оформить заказ" className='payment__dashboard-btn' callback={() => handleCreatePayment()}/>
                            </div>

                        </div>
                                                                            :
                        <div className="empty-page">
                            <NoPaymentIcon/>
                            <h1>Пустой заказ</h1>
                        </div>

                    }

                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />

            </section>
            
        </motion.main>
    )
}

export default Payment;