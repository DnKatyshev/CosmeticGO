'use client'

// react-dependencies
import { FC, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';

// Server
import { ReviewsApi } from '@/app/orval-api';

// Zustand
import useCatalogStore from '@/store/zustandStore';

// Components
import Button from '@/ui/Button/Button';
import Preloader from '../../../../assets/icons/preloader.svg'

// MUI-components
import Modal from '@mui/material/Modal';
import { Rating } from '@mui/material';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';


// project's styles/img
import './modal.scss'


const ReviewModal:FC = ({}): JSX.Element => {

    const router = useRouter()
    const [ratingValue, setRatingValue] = useState<number | undefined>(4);
    const [textareaValue, setTextareaValue] = useState('')
    const handleChange = debounce((event) => {
        setTextareaValue(event.target.value)
    }, 500)
    console.log(ratingValue, textareaValue)
    
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        router.back()
    }

    // делаем post-запрос, отправляем объект отзыва, создаём новый отзыв 
    const { mutate: createReview, isPending, isSuccess } = ReviewsApi.useCreateReview();
    const pathname = usePathname();
    const product_id = pathname.split('/')[2]; // получаем product_id из URL


    const {data: session} = useSession()

    const handleCreateReview = () => {
        if(session){
            createReview({
                data: {
                    product_id,
                    username: session?.user?.name || session?.user?.username,
                    text: textareaValue,
                    rating: ratingValue,
                },
            });
        }

    };

  
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >

            {
                isPending
                            ?
                <Preloader className='preloader modal-preloader'/>
                            :
                isSuccess  
                            ?
                <div className="modal-success">
                    <DoneAllRoundedIcon/>
                    <h1>Отзыв создан!</h1>
                </div>
                            :
                <div className="modal">
                    <h1>Оставьте отзыв</h1>
                    <div className="modal__item">
                        <Rating
                            value={ratingValue}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                            className='modal__item-stars'
                        />
                    </div>
                    <div className="modal__item">
                        <textarea 
                            onChange={(event) => handleChange(event)}
                            className='modal__item-textarea'
                        />
                    </div>
    
                    <Button 
                        text={'Создать'}
                        className={'modal__btn'}
                        callback={handleCreateReview}
                    />
                </div>
            }


        </Modal>
    );
}

export default ReviewModal