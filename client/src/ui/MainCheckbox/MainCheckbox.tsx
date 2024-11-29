import { FC } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import useZustandStore from '@/store/zustandStore';

export const MainCheckbox = ({productsCount, productIds, user, quantities} : {productsCount: number, productIds: string[], user: string, quantities: number}) => {
    
    const {mainCheckbox, setMainCheckbox} = useZustandStore((state) => state);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setMainCheckbox(isChecked, productsCount, productIds, user, quantities);
    };


    return (
        <FormControlLabel
            control={
                <Checkbox
                    color="secondary"
                    checked={mainCheckbox}
                    onChange={handleChange}
                />
            }
            label="Выбрать все"
        />
    );
};
