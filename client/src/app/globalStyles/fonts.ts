import { Inter } from 'next/font/google'
import { Raleway } from 'next/font/google'
import { Ms_Madi } from 'next/font/google'

export const inter = Inter({
    weight: ['300', '400', '500', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})


export const raleway = Raleway({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-raleway',
    display: 'swap',
})


export const ms_madi = Ms_Madi({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-ms_madi',
    display: 'swap',
    preload: 'latin'
})

