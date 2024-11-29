'use client'

// react-dependencies
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {toast, Toaster} from 'react-hot-toast'

// Server-actions
import { signInAction } from '@/app/actions';

// Zustand

// Components
import Preloader from '../../../../assets/icons/preloader.svg'

// MUI-components


// project's styles/img
import './loginForm.scss'


// ZOD-Schema
const LoginFormSchema = z.object({
    username: z.string().min(3, 'Мин. длина имени — 3 символа').max(15, 'Макс. длина имени — 12 символов'),
    password: z.string().min(6, 'Мин. длина пароля — 6 символов').max(15, 'Макс. длина пароля — 12 символов').optional(),
    email: z.string().email().optional(),
})
export type TLoginForm = z.infer<typeof LoginFormSchema>



const LoginForm:FC = ({}): JSX.Element => {

    const{
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TLoginForm>({
        resolver: zodResolver(LoginFormSchema)
    })


    const [formLoading, setFormLoading] = useState(false)

    const onSubmit = async (formData:TLoginForm) => {

        try {
        
            setFormLoading(true)

            // server-action для логирования пользователя - если введённые данные совпадают с теми, что записаны в БД - мы заново записываем введённые данные в Session
            const result = await signInAction(formData)
            if(result.status === 403){
                toast.error("Вы ввели неправильные данные или такого аккаунта не существует!", {duration: 6000})
                reset()
            } else {

                // вызов signIn()-метода для того, чтобы Next-Auth знал про произошёл вход, для записи этих данных в Session
                await signIn('credentials', {
                    redirect: false,
                    username: formData.username,
                    password: formData.password,
                });

                setFormLoading(false)

                toast.success('Успешный вход в аккаунт!', {duration: 6000})
                //reset()
            }

        } catch (error) {
            setFormLoading(false)
            toast.error("Что-то пошло не так!", {duration: 6000})
        }
    }

  
    return (
        <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

            <div className="form__main">
                <div className="form__group">
                    <label htmlFor="input-1" className="form__label">Имя:</label>
                    <input className="form__input" id="input-1" type="text"
                        {
                            ...register('username')
                        }
                    />
                    {errors?.username && <span className="form__error">{errors?.username?.message}</span>}
                    
                </div>
                <div className="form__group">
                    <label htmlFor="input-2" className="form__label">Пароль:</label>
                    <input className="form__input" id="input-2" type="text"
                        {
                            ...register('password')
                        }
                    />
                    {errors?.password && <span className="form__error">{errors?.password?.message}</span>}
                </div>

                <button className="form__btn" type="submit">Войти</button>

            </div>

            <span className="form__warning">*Нажимая "Войти", вы соглашаетесь на обработку персональных данных</span>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </form>
    );
}

export default LoginForm