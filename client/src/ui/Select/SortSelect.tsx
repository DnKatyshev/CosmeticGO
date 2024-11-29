// react-dependencies
import { FC, useState, forwardRef } from 'react';
import Select from 'react-select'

// project's styles/img
import './sortSelect.scss'

interface ISelect {
    options: {
        value: string,
        label: string
    },
    placeholder: string,
    classname: string,
    callback: (keyOrValue: string, value?: string) => void
}


export const SortSelect:FC <ISelect> = forwardRef(({options, placeholder, classname, callback}, ref):JSX.Element => {



    const [selectedOption, setSelectedOption] = useState("user");

    const handleChange = (option) => {
        setSelectedOption(option);

        if (callback.length === 2) {
            callback('sort', option.value); // вызов для store
        } else {
            callback(option.value); // вызов для RHF
        }
    };


    return (
        <Select 
            options={options} 
            placeholder={placeholder}
            className={`select ${classname}`}
            value={selectedOption}
            onChange={handleChange}
        />
    );
})