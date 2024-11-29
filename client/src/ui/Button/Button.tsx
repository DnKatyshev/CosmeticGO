// react-dependencies
import { FC } from "react"

// project's styles/img
import './button.scss'

interface ButtonProps {
    text: string | Element,
    className: string,
    callback: () => void
}

const Button:FC<ButtonProps> = ({text, className, callback}):JSX.Element => {

    return (
        <button 
            className={`btn ${className}`}
            onClick={() => callback()}
        >
            {text}
        </button>
    )
}

export default Button;