import { useState, useEffect } from "react";

interface IGeolocation {
    latitude: number;
    longitude: number;
}

const useGeolocation = () => {

    const [location, setLocation] = useState<IGeolocation | null>();
    const [locationError, setLocationError] = useState<string | null>('');

    useEffect(() => {

        if (!navigator.geolocation) {
            setLocationError("Ваш браузер не поддерживает геолокацию");
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ longitude, latitude });
            },
            (err) => {
                setLocationError(`Ошибка при получении геолокации: ${err.message}`);
            }
        );

    }, [])
  
    return { location, locationError }

}

export default useGeolocation;