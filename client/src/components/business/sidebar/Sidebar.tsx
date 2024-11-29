// react-dependencies
import { FC } from 'react';

// Components
import {SidebarCheckbox} from '@/ui/SidebarCheckbox/SidebarCheckbox';
import MinimumDistanceSlider from '@/ui/Slider/Slider';
import { Divider } from '@mui/material';

// Zustand
import useZustandStore from '@/store/zustandStore';

// project's styles/img
import './sidebar.scss'

interface ISidebar {
    countries: {
        name: string,
        id: number,
    }[],
} 

export const Sidebar:FC<ISidebar> = ({countries}):JSX.Element => {

    const updateCatalogQueryParams = useZustandStore((state) => state.updatecatalogQueryParams)

    return (
        <div className="sidebar">

            <div className="sidebar__item">
                <h3 className="sidebar__title">
                    Страна
                </h3>
                <div className="sidebar__checkbox">
                    {
                        countries.map((country, id) => {
                            return (
                                <SidebarCheckbox 
                                    key={id}
                                    name={country.name} 
                                    storeKey={'catalogCountryId'}
                                    storeValue={country.id}
                                    updateParams={updateCatalogQueryParams}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="sidebar__item">
                <h3 className="sidebar__title">
                    Цена
                </h3>
                <MinimumDistanceSlider updateParams={updateCatalogQueryParams}/>
            </div>
            <div className="sidebar__item">
                <h3 className="sidebar__title">
                    Дополнительно
                </h3>
                <div className="sidebar__checkbox">
                    <SidebarCheckbox
                        key={1}
                        name={'Веганские товары'} 
                        storeKey={'vegan'}
                        storeValue={true}
                        updateParams={updateCatalogQueryParams}
                    />
                </div>
            </div>

            <Divider className='divider'/>

        </div>
    );
}