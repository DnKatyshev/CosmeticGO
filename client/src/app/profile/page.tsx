'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import dayjs from 'dayjs'
import useGeolocation from '@/hooks/useGeolocation';

// Server-actions
import { getProfileInfo, getAddress, setAddress } from '../actions';

// Orval-hooks
import { ReviewsApi } from '../orval-api';

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import UserReview from '@/components/business/userReview/UserReview';
import Button from '@/ui/Button/Button';
import Preloader from '@/assets/icons/preloader.svg'

// MUI-components
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';

// project's styles/img
import './profile.scss'
import Flower from './assets/flower_1.svg'
import { TProfileSchema, TUserReviewSchema } from '../../../types/types';


const Profile: FC = (): JSX.Element => {

    const {data: session, status} = useSession()
    let username:string
    if(session?.user){
        username = session?.user.name || session?.user.username
    } 


    // В этом Компоненте работа с API использует 2 технологии: Server Action-a  и  Orval-хук, созданный на основе YAML-контракта
    // Server Action-a используется для получения модели конкретного User-a через его username, а через Orval-хук мы берём поле reviews(с массивов ObjectIDs) у этого User-a и получаем из модели Reviews массив с отзывами - созданными КОНКРЕТНО ЭТИМ User-ом

    
    // Записываем данные документа User-a в State
    const [profileInfo, setProfileInfo] = useState<TProfileSchema>()
    const getProfilePageInfo = async () => {
        if(username){
            const profile = await getProfileInfo(username)
            setProfileInfo(profile.result)
        }
    }
    useEffect(() => {
        getProfilePageInfo()
    }, [session])

    //console.log('profileInfo - ', profileInfo)


    // Получение ОТЗЫВОВ из запроса через Orval POST react-query хук - если передаём в запросе "withProductsFlag" - значит подтягиваем данные о продуктах через .populate
    const { mutate: getReviews, data: reviews, error } = ReviewsApi.useGetReviews();
    useEffect(() => {
        if (profileInfo) {
            getReviews({ data: {reviewsIds: profileInfo.reviews, withProductsFlag: true} });
        }
    }, [profileInfo]);
    const reviewsData = reviews?.data.result
    
    console.log(reviewsData)


    // Работа с Геолокацией. Опеределяем её через custum-hook(Geolocation API) и Яндекс Геокодер, записываем в Store и User-document в БД
    const setUserAddress = useZustandStore(state => state.setUserAddress)

    const {location, locationError} = useGeolocation()
    const geolocationHandler = async () => {
        const geolocation = await getAddress(location?.longitude, location?.latitude)

        const exactAddress = geolocation.response.GeoObjectCollection.featureMember[0] && geolocation.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text
        const commonAddress = geolocation.response.GeoObjectCollection.featureMember[1] && geolocation.response.GeoObjectCollection.featureMember[1].GeoObject.description

        // store-update
        setUserAddress(commonAddress, exactAddress)

        // server-action
        if(username){
            console.log('USERNAME: ', username)
            setAddress(username, exactAddress)
        }

    }
    useEffect(() => {
        geolocationHandler()
    })
    
    //console.log('GEOLOCATION: ', location, locationError)
    console.log('SESSION: ', session)

    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            {
                status === 'loading'
                                        ?
                <Preloader className='preloader profile-preloader'/>
                                        :
                session
                                        ?
                <section className="profile">
                    <div className="profile__body">
                        <div className="profile__header">
                            {
                                status === 'loading'
                                                    ?
                                <Skeleton variant="circular" width={80} height={80} />
                                                    :
                                session?.user?.image
                                                    ?
                                <Avatar 
                                    alt="Profile page-icon #google" 
                                    src={session?.user?.image} 
                                    sx={{ width: 80, height: 80 }}
                                />
                                                    :
                                <Avatar 
                                    alt="Profile page-icon #credentials" 
                                    sx={{ width: 48, height: 48, bgcolor: deepPurple[500], color: '#fff' }}
                                >
                                    {profileInfo?.username && profileInfo?.username.slice(0,1)}
                                </Avatar>
                            }
                            <h1>{profileInfo?.username}</h1>
                            {
                                profileInfo?.verified === true
                                                                    ?
                                <span className="profile__verified true">Подтверждён</span>
                                                                    :
                                <span className="profile__verified false">Не подтверждён</span>
                            }
                        </div>


                        <div className="profile__info">
                            <div className="profile__info-item">
                                <h2>Почта:</h2>
                                <p>{profileInfo?.email}</p>
                            </div>
                            <div className="profile__info-item">
                                <h2>Адрес:</h2>
                                <p>{profileInfo?.address}</p>
                            </div>
                            <div className="profile__info-item">
                                <h2>Скидочная карта:</h2>
                                <p>{profileInfo?.discountCard ? "Оформлена" : "Не оформлена"}</p>
                            </div>
                            <div className="profile__info-item">
                                <h2>Роль:</h2>
                                <p>{profileInfo?.role}</p>
                            </div>
                            <div className="profile__info-item">
                                <h2>Аккаунт создан:</h2>
                                <p>{dayjs(profileInfo?.createdAt).format('DD.MM.YYYY  HH:mm')}</p>
                            </div>
                            <div className="profile__info-item">
                                <h2>Последняя дата входа:</h2>
                                <p>{dayjs(profileInfo?.updatedAt).format('DD.MM.YYYY  HH:mm')}</p>
                            </div>
                        </div>


                        <div className="profile__reviews">
                            <h1>Мои отзывы:</h1>
                            {
                                reviewsData && reviewsData.length > 0
                                            ?
                                <div className="profile__reviews-main">
                                    {
                                        reviewsData && reviewsData.map((userReview:TUserReviewSchema) => (
                                            <UserReview 
                                                key={userReview._id}
                                                username={userReview.username}
                                                text={userReview.text}
                                                rating={userReview.rating}
                                                productId={userReview.product_id._id}
                                                productImage={userReview.product_id.photos[0]}
                                                productName={userReview.product_id.name}
                                                productPrice={userReview.product_id.price}
                                            />
                                        ))
                                    }
                                </div>
                                            :
                                <div className="profile__reviews-empty">
                                    <p>У вас ещё нет отзывов</p>
                                </div>
                            }
                        </div>

                        <Button text={'Выйти'} className={'profile__out-btn'} callback={() => signOut()}/>
                    </div>

                </section>            
                            :
                <div className="flower">
                    <Flower className={'flower__svg'}/>
                    <h3>Вам стоит создать аккаунт в нашем сервисе)</h3>
                </div>
            }
        </motion.main>
    )
}

export default Profile;