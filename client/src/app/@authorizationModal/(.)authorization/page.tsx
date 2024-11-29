'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';

// Server

// Zustand

// Components
import Button from '@/ui/Button/Button';
import Preloader from '../../../../assets/icons/preloader.svg'
import LoginForm from '@/components/business/loginForm/login-form';
import RegisterForm from '@/components/business/registerForm/register-form';

// MUI-components
import Modal from '@mui/material/Modal';


// project's styles/img
import GoogleIcon from '@/assets/icons/google-icon.svg'
import './authorization.scss'


const Authorization:FC = ({}): JSX.Element => {

    const [loginStatus, setLoginStatus] = useState(true)


    const router = useRouter()
    
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        router.back()
    }



    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className="form-modal">
                {
                    loginStatus
                                ?
                    <LoginForm/>
                                :
                    <RegisterForm/>
                }

                <button 
                    className='btn google-btn'
                    onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/profile' })}
                >
                    <GoogleIcon/>
                    Google
                </button>
                

                <Button text={loginStatus ? 'Регистрация' : 'Вход'} className={'form-change'} callback={() => setLoginStatus(!loginStatus)} />
            </div>
        </Modal>
    );
}

export default Authorization