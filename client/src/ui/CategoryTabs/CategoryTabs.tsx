'use client'

// react-dependencies
import { FC } from 'react';
import Link from 'next/link';

// Zustand
import useCatalogStore from '@/store/zustandStore';

// project's styles/img
import './tabs.scss'

interface ICategories {
    categories: {name: string, id: number}[]
}

export const CategoryTabs:FC<ICategories> = ({categories}):JSX.Element => {

    const categoryTabsId = useCatalogStore((state) => state.categoryTabsId)

    return (
        <div className="tabs">
            {
                categories.map((category => {
                    return (
                        <Link
                            href={'#'+category.id}
                            className={Number(categoryTabsId) === category.id ? "tabs__link active" : "tabs__link"}
                        >
                            {category.name}
                        </Link>
                    )
                }))
            }
        </div>
    );
}