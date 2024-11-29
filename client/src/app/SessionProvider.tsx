'use client'

// react-dependencies
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';


const SessionAuthProvider = ({children} : {children: ReactNode}): JSX.Element => {

  
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default SessionAuthProvider