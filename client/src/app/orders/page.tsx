'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

// Server-actions
import { getPaidOrder } from '../actions';

// Zustand

// Components
import { PaidOrder } from '@/components/business/paidOrder/PaidOrder';

// MUI-components

// types (ZOD + TS)

// project's styles/img
import NoCartIcon from '@/assets/icons/no-reviews.svg'
import Preloader from '../../assets/icons/preloader.svg'
import './orders.scss'



const Orders: FC = (): JSX.Element => {

    const {data: session, status} = useSession()
    const [paidOrderState, setPaidOrderState] = useState<any>()
    const [orderLoading, setOrderLoading] = useState(false)

    let user
    const getUserPaidOrder = async () => {
        if (session) {
            user = session?.user.name || session?.user.username

            setOrderLoading(true)
            const order = await getPaidOrder(user)
            setOrderLoading(false)

            setPaidOrderState(order.result)
        }
    }

    useEffect(() => {
        getUserPaidOrder()
    }, [session])

    console.log('===paidOrderState===', paidOrderState)


    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            <section className="paid-orders">
                <div className="paid-orders__body">
                    <h1 className="paid-orders__title">Ваши заказы:</h1>

                    {
                        orderLoading
                                        ?
                        <Preloader className='preloader'/>
                                        :
                        paidOrderState && paidOrderState.products.length > 0
                                        ?
                        <div className="cart__orders-list">
                            {
                                paidOrderState && paidOrderState.products.map((oneOrder:any, index:number) => (
                                    <PaidOrder 
                                        key={index} 
                                        paymentId={paidOrderState.paymentId}
                                        oneOrder={oneOrder && oneOrder}
                                    />
                                ))
                            }
                        </div>
                                        :
                        <div className="empty-page">
                            <NoCartIcon/>
                            <h1>Нет оплаченных заказов</h1>
                        </div>
                    }

                </div>
            </section>
            
        </motion.main>
    )
}

export default Orders;