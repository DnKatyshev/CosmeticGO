// react-dependencies
import { FC } from 'react';

// MUI
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// project's styles/img
import './checkbox.scss'

interface ISidebarCheckbox{
    key: number,
    name: string,
    storeKey: "catalogCountryId" | "vegan",
    storeValue: number | boolean,
    updateParams: (key: "catalogCountryId" | "vegan", value: any, isChecked: boolean) => void
}


export const SidebarCheckbox:FC<ISidebarCheckbox> = ({key, name, storeKey, storeValue, updateParams}):JSX.Element => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        updateParams(storeKey, storeValue, isChecked); // Передаем, установлен ли чекбокс
    };


    return (
        <FormControlLabel 
            control={
                <Checkbox 
                    key={key}
                    color="secondary" 
                    onChange={handleChange}
                />
            } 
            label={name}
        />
    );
}