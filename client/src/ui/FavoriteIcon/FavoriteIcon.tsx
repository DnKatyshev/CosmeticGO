
// react-dependencies
import { FC } from 'react';

// MUI

// project's styles/img
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const FavoriteCheckbox:FC = ():JSX.Element => {



    return (
        <div className='favorite-icon'>
            <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} color="secondary"/>
        </div>
    );
}