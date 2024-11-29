// react-dependencies
import { FC } from "react"
import Link from "next/link"
import {useSession} from 'next-auth/react'

// MUI
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';

// project's styles/img
import './link.scss'

interface AuthLinkProps {
    className: string,
}

const AuthLink:FC<AuthLinkProps> = ({className}):JSX.Element => {

    const {data: session, status} = useSession()

    return (
        <div className="authorize-btn">

                {
                    status === "loading"
                            ?
                    <Skeleton variant="circular" width={40} height={40} />
                            :
                    session?.user.password
                            ?
                    <Link 
                        className={`avatar ${className}`}
                        href={'/profile'}
                    >
                        <Avatar 
                            alt="Profile header-icon #credentials" 
                            sx={{ width: 48, height: 48, bgcolor: deepPurple[500], color: '#fff' }}
                        >
                            {session.user?.username?.slice(0,1)}
                        </Avatar>
                    </Link>
                            :

                    session?.user?.image
                            ?
                    <Link 
                        className={`avatar ${className}`}
                        href={'/profile'}
                    >
                        <Avatar 
                            alt="Profile header-icon #google" 
                            src={session.user?.image} 
                            sx={{ width: 48, height: 48 }}
                        />
                    </Link>
                            :

                    <Link 
                        className={`link ${className}`}
                        href={'/authorization'}
                    >
                        Войти
                    </Link>
                }

        </div>
    )
}

export default AuthLink;