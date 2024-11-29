'use client'

// react-dependencies
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha";
import {toast, Toaster} from 'react-hot-toast'

// actions
import { signUpAction } from "@/app/actions";
import { signUpVerifyCode } from '@/app/actions';

// Zustand

// Components
import Preloader from '../../../assets/icons/preloader.svg'
import { SortSelect } from '@/ui/Select/SortSelect';
import OtpInput from '../otp-input/OtpInput';

// MUI-components

// project's styles/img
import '../loginForm/loginForm.scss'


// ZOD-Schema
const RegisterFormSchema = z.object({
    username: z.string().min(3, 'Мин. длина имени — 3 символа').max(15, 'Макс. длина имени — 12 символов'),
    password: z.string().min(6, 'Мин. длина пароля — 6 символов').max(15, 'Макс. длина пароля — 12 символов'),
    confirm: z.string().optional(),
    email: z.string().email({ message: "Неправильный email-формат" }),
    role: z.string().min(1, "Укажите свою роль в приложении"),
    verifyCode: z.string().optional()
}).refine((data) => data.password === data.confirm, {
    message: "Пароли должны совпадать)",
    path: ["confirm"],
});
export type TRegisterForm = z.infer<typeof RegisterFormSchema>



const RegisterForm:FC = ({}): JSX.Element => {

    const{
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: {errors},
    } = useForm<TRegisterForm>({
        resolver: zodResolver(RegisterFormSchema)
    })


    const [formLoading, setFormLoading] = useState(false)
    const [otpInput, setOtpInput] = useState(false)
    const [activateCode, setActivateCode] = useState('')

    const onSubmit = async (formData:TRegisterForm) => {
        try {
            const activateCode = Math.floor(100000 + Math.random() * 900000).toString();
            setActivateCode(activateCode)

            setFormLoading(true)

            // server-action для записи уникального пользователя в БД
            const result = await signUpAction({
                ...formData,
                verifyCode: activateCode
            })
            if(result.status === 400){
                toast.error("Аккаунт уже существует!", {duration: 6000})
                reset()
            } else {

                // вызов signIn()-метода для того, чтобы Next-Auth знал про произошёл вход, для записи этих данных в Session
                await signIn('credentials', {
                    redirect: false,
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    role: formData.role,
                });
                
                // Отправка запроса на Route-Handler для отправки email с активационным кодом
                const response = await fetch('api/activation-email', {
                    method: 'POST',
                    body: JSON.stringify({ email: formData.email, username: formData.username, activateCode }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if(response.ok){
                    setFormLoading(false)
                    setOtpInput(true)
                }
    
                toast.success('Код активации отправлен на почту!', {duration: 6000})
                reset()
            }

        } catch (error) {
            setFormLoading(false)
            toast.error("Что-то пошло не так!", {duration: 6000})
        }
        console.log(formData)
    }
    
    
    const [recaptchaStatus, setRecaptchaStatus] = useState(false)
    const recaptchaChange = () => {
        setRecaptchaStatus(!recaptchaStatus)
    }

    const options = [
        { value: 'user', label: 'USER' },
        { value: 'admin', label: 'ADMIN' },
    ]


    return (
        <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

            {
                formLoading
                                ?
                <Preloader className='preloader'/>
                                :
                otpInput             
                                ?
                <OtpInput numInputs={activateCode.length} otpCallback={signUpVerifyCode}/>
                                :
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
                    <div className="form__group">
                        <label htmlFor="input-3" className="form__label">Пароль ещё раз:</label>
                        <input className="form__input" id="input-3" type="text"
                            {
                                ...register('confirm')
                            }
                        />
                        {errors?.confirm && <span className="form__error">{errors?.confirm?.message}</span>}
                    </div>
                    <div className="form__group">
                        <label htmlFor="input-4" className="form__label">Email:</label>
                        <input className="form__input" id="input-4" type="text"
                            {
                                ...register('email')
                            }
                        />
                        {errors?.email && <span className="form__error">{errors?.email?.message}</span>}
                    </div>

                    <input type="hidden" 
                        {
                            ...register('role')
                        }
                    />

                    <div>
                        <SortSelect
                            options={options}
                            placeholder="Роль"
                            classname="form-select"
                            callback={(value) => {
                                setValue("role", value);
                                trigger("role");
                            }}
                        />
                        {errors.role && <span className="form__error">{errors.role.message}</span>}
                    </div>

                    <ReCAPTCHA
                        sitekey="6LfnA3UqAAAAAAq_3v0WuLKENJtlKhVgqhnfxj6N"
                        onChange={recaptchaChange}
                        className="recaptcha"
                        style={{
                            display: "block",
                            margin: "0 auto"
                        }}
                    />


                    <button 
                        className="form__btn" 
                        type="submit" 
                        disabled={recaptchaStatus ? false : true} 
                    >
                        Зарегистрироваться
                    </button>

                </div>
            }


            <span className="form__warning">*Нажимая "Зарегистрироваться", вы соглашаетесь на обработку персональных данных</span>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </form>
    );
}

export default RegisterForm