import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useRef, useState } from 'react';
import cls from './LocationPicker.module.scss';

interface LocationPickerProps {
    className?: string;
    onLocationSelect?: (location: { lat: number; lon: number }) => void;
    defaultLocation?: { lat: number; lon: number };
    zoom?: number;
    useGeolocation?: boolean;
}

declare global {
    interface Window {
        ymaps: any;
    }
}

export const LocationPicker = (props: LocationPickerProps) => {
    const {
        className,
        onLocationSelect,
        defaultLocation = { lat: 55.75, lon: 37.57 }, // Москва по умолчанию
        zoom = 10,
        useGeolocation = false
    } = props;

    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [placemark, setPlacemark] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState(defaultLocation);

    // Функция для обновления позиции метки при клике или перетаскивании
    const updateLocationFromUser = (coords: number[]) => {
        const newLocation = {
            lat: coords[0],
            lon: coords[1]
        };

        setCurrentLocation(newLocation);
        onLocationSelect?.(newLocation);

        if (placemark) {
            placemark.geometry.setCoordinates(coords);
        }
    };

    // Функция для обновления позиции метки при внешних изменениях
    const updateLocationFromProps = (coords: number[]) => {
        const newLocation = {
            lat: coords[0],
            lon: coords[1]
        };

        setCurrentLocation(newLocation);

        if (placemark) {
            placemark.geometry.setCoordinates(coords);
        }
        if (map) {
            map.setCenter(coords);
        }
    };

    // Получение геолокации пользователя
    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    updateLocationFromProps(coords);
                },
                (error) => {
                    console.error('Ошибка получения геолокации:', error);
                }
            );
        }
    };

    useEffect(() => {
        // Инициализация карты
        const init = () => {
            if (mapRef.current) {
                const ymap = new window.ymaps.Map(mapRef.current, {
                    center: [currentLocation.lat, currentLocation.lon],
                    zoom,
                    controls: ['zoomControl']
                });

                // Создаем метку
                const mark = new window.ymaps.Placemark([currentLocation.lat, currentLocation.lon], {}, {
                    draggable: true,
                    preset: 'islands#blueCircleDotIcon' // Добавляем стандартный стиль метки
                });

                // Добавляем метку на карту
                ymap.geoObjects.add(mark);

                // Обработчик перетаскивания метки
                mark.events.add('dragend', () => {
                    const coords = mark.geometry.getCoordinates();
                    updateLocationFromUser(coords);
                });

                // Обработчик клика по карте
                ymap.events.add('click', (e: any) => {
                    const coords = e.get('coords');
                    mark.geometry.setCoordinates(coords); // Перемещаем метку
                    updateLocationFromUser(coords);
                });

                setMap(ymap);
                setPlacemark(mark);

                // Если включена геолокация, запрашиваем позицию пользователя
                if (useGeolocation) {
                    getUserLocation();
                }
            }
        };

        // Ждем загрузки API
        window.ymaps.ready(init);

        return () => {
            if (map) {
                map.destroy();
                setMap(null);
                setPlacemark(null);
            }
        };
    }, [zoom]);

    // Обновляем позицию при изменении defaultLocation извне
    useEffect(() => {
        if (defaultLocation.lat !== currentLocation.lat || defaultLocation.lon !== currentLocation.lon) {
            updateLocationFromProps([defaultLocation.lat, defaultLocation.lon]);
        }
    }, [defaultLocation.lat, defaultLocation.lon]);

    return (
        <div 
            className={classNames(cls.locationPicker, {}, [className])}
            ref={mapRef}
        />
    );
}; 