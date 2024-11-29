'use client'

// react-dependencies
import { FC, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import {toast, Toaster} from 'react-hot-toast'

// server-actions
import { changeDiscountStatus } from "@/app/actions"

// Components
import Preloader from '@/assets/icons/preloader.svg'

// project's styles/img
import './discountForm.scss'


// ZOD-Schema
const FormSchema = z.object({
    connection: z.string().min(5, 'Введите контакт, по которому с вами можно связаться'),
    experience: z.string().min(1, 'Немного расскажите про свой опыт покупок в CosmeticGO)'),
})
type TForm = z.infer<typeof FormSchema>


export const DiscountForm:FC = ():JSX.Element => {

    // Если пользователь ебз аккаунта - не даём ему отправить письмо
    const {data} = useSession()
    if(data?.user){
        console.log(data?.user)
        var username = data?.user.name || data?.user.username
        var {email} = data?.user
    } 
    

    const{
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TForm>({
        resolver: zodResolver(FormSchema)
    })


    const [formLoading, setFormLoading] = useState(false)

    const onSubmit = async (formData:TForm) => {
        try {

            // state для отслеживания статуса user-a - если у него есть аккаунт, то он может отправить запрос, если нет - то не может
            if(!data){
                toast.error('Сначала создайте аккаунт!', {duration: 6000})
                reset()
                return
            }
            
            setFormLoading(true)

            // Запрос на Route-Handler для отправки email
            await fetch('api/discount-email', {
                method: 'POST',
                body: JSON.stringify({ username, email }),
                headers: { 'Content-Type': 'application/json' },
            });

            // вызов server-action для изменения поля "discountCard" в документе User-a
            await changeDiscountStatus(username)
    
            setFormLoading(false)
            toast.success('Заявка отправлена!', {duration: 6000})
            reset()

        } catch (error) {
            toast.error('Что-то пошло не так!', {duration: 6000})
        }

    }
    


    return (
        <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

            {
                formLoading
                            ?
                <Preloader className='preloader'/>
                            :
                <div className="form__main">
                    <div className="form__group">
                        <label htmlFor="input-2" className="form__label">TG / Почта / Номер</label>
                        <input className="form__input" id="input-2" type="text"
                            {
                                ...register('connection')
                            }
                        />
                        {errors?.connection && <span className="form__error">{errors?.connection?.message}</span>}
                    </div>
                    <div className="form__group">
                        <label className="form__label">Опишите свой опыт покупок в <span>CosmeticGO:</span></label>
                        <textarea className="form__textarea"
                            {
                                ...register('experience')
                            }
                        />
                        {errors?.experience && <span className="form__error">{errors?.experience?.message}</span>}
                    </div>


                    <button className="form__btn" type="submit">Отправить</button>
                </div>
            }

            <span className="form__warning">*Нажимая "Отправить", вы соглашаетесь на обработку персональных данных</span>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </form>
    )
}
