'use client'

// react-dependencies
import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';

// MUI-components
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';

// project's styles/img
import './tabs.scss'
import { IProduct } from '@/app/product/[productID]/page';


const MuiTabs:FC<IProduct> = ({productData}):JSX.Element => {

    const pathname = usePathname()

    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <section className="tab">
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Описание" value="1" />
                    <Tab label="Состав" value="2" />
                    <Tab label="Бренд" value="3" />
                </TabList>
                <TabPanel value="1" className='tab__content'>
                    <h1 className='tab__name'>{productData.name}</h1>
                    <p className='tab__article'>Артикул: {pathname.split('/')[2]}</p>
                    <p className="tab__description">{productData.description}</p>
                    <div className="tab__info">
                        <h3 className='tab__title'>Категория:</h3>
                        <Divider/>
                        <h3 className='tab__text'>{productData.category.name}</h3>
                    </div>
                    {
                        productData.weight 
                                            ? 
                        <div className="tab__info">
                            <h3 className='tab__title'>Вес:</h3>
                            <Divider/>
                            <h3 className='tab__text'>{productData.weight}гр</h3>
                        </div>                    
                                            :
                        <div className="tab__info">
                            <h3 className='tab__title'>Объём:</h3>
                            <Divider/>
                            <h3 className='tab__text'>{productData.volume}мл</h3>
                        </div> 
                    }
                    <div className="tab__info">
                        <h3 className='tab__title'>Веганский:</h3>
                        <Divider/>
                        <h3 className='tab__text'>{productData.vegan ? "ДА" : "НЕТ"}</h3>
                    </div>
                </TabPanel>
                <TabPanel value="2" className='tab__content'>
                    <p className="tab__ingridients">
                        {productData.ingredients}
                    </p>
                </TabPanel>
                <TabPanel value="3" className='tab__content'>
                    <div className="tab__info">
                        <h3 className='tab__title'>Бренд:</h3>
                        <Divider/>
                        <h3 className='tab__text'>{productData.brand}</h3>
                    </div> 
                    <div className="tab__info">
                        <h3 className='tab__title'>Страна:</h3>
                        <Divider/>
                        <h3 className='tab__text'>{productData.country.name}</h3>
                    </div> 
                </TabPanel>
            </TabContext>
        </section>
    );
}

export default MuiTabs