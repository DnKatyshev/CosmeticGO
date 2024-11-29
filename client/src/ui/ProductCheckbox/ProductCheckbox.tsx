import { FC } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import useZustandStore from '@/store/zustandStore';

interface ProductCheckboxProps {
    index: number;
    label: string;
    productId: string
    username: string
    quantity: number
}

export const ProductCheckbox: FC<ProductCheckboxProps> = ({ index, label, productId, username, quantity }) => {
    const { productCheckboxes, setProductCheckboxes } = useZustandStore((state) => state);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setProductCheckboxes(index, isChecked, productId, username, quantity);
    };


    return (
        <FormControlLabel
            control={
                <Checkbox
                    color="secondary"
                    checked={productCheckboxes[index]?.isChecked || false}
                    onChange={handleChange}
                />
            }
            label={label}
        />
    );
};
