// react-dependencies
import { FC } from 'react';

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import { CategoryTabs } from '@/ui/CategoryTabs/CategoryTabs';
import { SortSelect } from '@/ui/Select/SortSelect';

// project's styles/img
import './topbar.scss'

interface ICategories {
    categories: {name: string, id: number}[]
}


export const Topbar:FC<ICategories> = ({categories}):JSX.Element => {

    const options = [
        { value: 'categories', label: 'По категориям' },
        { value: 'increase', label: 'По цене (возрастание)' },
        { value: 'decrease', label: 'По цене (убывание)' },
    ]

    const updateCatalogQueryParams = useZustandStore((state) => state.updatecatalogQueryParams)


    return (
        <div className="topbar">
            <CategoryTabs categories={categories}/>
            <SortSelect 
                options={options}
                placeholder={'Фильтрация'}
                classname={'top-select'}
                callback={(key, value) => updateCatalogQueryParams(key, value)}
            />
        </div>
    );
}