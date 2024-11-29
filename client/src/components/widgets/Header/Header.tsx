'use client'

// react-dependencies
import { FC, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";

// Zustand
import useZustandStore from "@/store/zustandStore";

// MUI-dependencies
import { useMediaQuery, Drawer } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import Badge from "@mui/material";

// Components
import Logo from "@/ui/Logo/Logo"
import Button from "@/ui/Button/Button"
import AuthLink from "@/ui/AuthLink/AuthLink";
import DrawerIcon from "@/assets/icons/mobile-drawer.svg"
import { CatalogInput } from "@/ui/CatalogInput/CatalogInput";
import CartButton from "@/components/business/cartButton/CartButton";

// project's styles/img
import './header.scss'


export const Header:FC = ():JSX.Element => {

    const [openFlag, setOpenFlag] = useState<boolean>(false)
    const mobileScreen = useMediaQuery('(max-width:1000px)');

    const pathname = usePathname()

    // общая стоимость корзины
    const userAddress = useZustandStore((state) => state.userAddress)


    return (

        <header className={pathname === '/' ? "header home-header" : "header"}>

        {            
            !mobileScreen

                            ?

            <div className="header__menu">
                <Logo/>

                <p className="header__address">
                    {userAddress.commonAddress}
                </p>

                <ul className="header__list">
                    <li className="header__li"><Link href='/catalog'>Каталог</Link></li>
                    <li className="header__li"><Link href="/orders">Заказы</Link></li>
                </ul>

                <ul className="header__list">
                    {
                        pathname === '/catalog'
                                                ?
                        <CatalogInput 
                            placeholder={'Поиск..'} 
                            icon={<SearchIcon/>}
                        />
                                                :
                        ''
                    }
                    <li className="header__li">
                        <CartButton/>
                    </li>
                    <AuthLink className="authorize-btn"/>
                </ul>
            </div>

                                :

            <div className="header__menu mobile">
                <Logo/>

                {
                    pathname === '/catalog'
                                            ?
                    <CatalogInput 
                        placeholder={'Поиск..'} 
                        icon={<SearchIcon/>}
                    />
                                            :
                    ''
                }

                <DrawerIcon onClick={() => setOpenFlag(!openFlag)}/>

                <Drawer
                    open={openFlag}
                    onClose={() => setOpenFlag(!openFlag)}
                    anchor={'right'}
                    className="drawer"
                >
                    <div className="header__drawer">

                        <Logo/>

                        <p className="header__address">
                            {userAddress.commonAddress}
                        </p>

                        <ul className="header__list-top">
                            <li className="header__li"><Link href='/catalog'>Каталог</Link></li>
                            <li className="header__li"><Link href="/orders">Заказы</Link></li>
                        </ul>

                        <div className="header__list-bottom">
                            <ul>
                                <li className="header__li">
                                    <CartButton/>
                                </li>
                            </ul>
                            <AuthLink className="authorize-btn"/>
                        </div>

                    </div>
                </Drawer>

            </div>
        }

        </header>
    )
}
