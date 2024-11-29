// react-dependencies
import { FC } from "react"
import Link from "next/link"

// project's styles/img
import './link.scss'

interface LinkProps {
    href: string,
    text: string,
    className: string,
}

const MainLink:FC<LinkProps> = ({href, text, className}):JSX.Element => {

    return (
        <Link 
            href={href}
            className={`link ${className}`}
        >
            {text}
        </Link>
    )
}

export default MainLink;