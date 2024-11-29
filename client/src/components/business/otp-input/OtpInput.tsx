// react-dependencies
import { useState } from 'react';
import OtpInputLibrary from 'react-otp-input';
import {toast, Toaster} from 'react-hot-toast'

// components
import Button from '@/ui/Button/Button';
import Preloader from '../../../assets/icons/preloader.svg'

// styles
import './otp-input.scss'


const OtpInput = ({numInputs, otpCallback}) => {

    const [otp, setOtp] = useState('');
    const [otpStatus, setOtpStatus] = useState(false)

    const otpHandleChange = async () => {

        setOtpStatus(true)

        const result = await otpCallback({verifyCode: otp})

        if(result.status === 200){
            toast.success('Код верификации подтверждён!', {duration: 6000})
            setOtpStatus(false)
            
        } else {
            toast.error('Введённый код верификации не верен!', {duration: 6000})
            setOtpStatus(false)
        }

    }

    return (
        <>
            {
                otpStatus
                            ?
                <Preloader className={'preloader'}/>
                            :
                <div className="otp">
                    <h1>Введите код</h1>
                    <OtpInputLibrary
                        value={otp}
                        onChange={setOtp}
                        numInputs={Number(numInputs)}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle='otp-container'
                        inputStyle='otp-input'
                    />
                    <button 
                        className="btn otp__btn"
                        onClick={otpHandleChange}
                    >
                        Отправить
                    </button>

                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                </div>
                
            }
        </>
    );
}

export default OtpInput
