import React, {useEffect, useState} from 'react';
import Categories from "./Categories";
import axios from 'axios'
import {Models} from "../models";
import {useTheme} from "./ThemeContext";
import { useTranslation } from 'react-i18next';

const Track = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Models[] | null>();
    const [value, setValue] = useState("");
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();

    const filteredCountries = (items || []).filter((item => {
        return item.artistName.toLowerCase().includes(value.toLowerCase())
    }));

    function TimeTrackMinutes(ms:number) {
        const s = ms / 1000;
         // Оставляем только целую часть
        return Math.floor(s / 60);
    }

    function TimeTrackSecond(ms:number) {
        const s = ms / 1000;
         // Оставляем только целую часть
        return Math.floor(s % 60);
    }

    // Функция для выполнения запроса к данным на основе текущего языка
    const fetchData = async (lang: string) => {
        try {
            const response = await axios.get(`data_${lang}.json`);
            setIsLoaded(true);
            setItems(response.data.filter((item: any) => item.wrapperType === 'track'));
        } catch (error) {
            setIsLoaded(true);
            setError(error as Error);
        }
    };

    // useEffect, следящий за изменением языка
    useEffect(() => {
        fetchData(i18n.language); // Вызываем fetchData с текущим языком
    }, [i18n.language]);

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        console.log(filteredCountries)
        return (
            <div className='pt-20 pb-4 px-0'>
                <input
                    type="search"
                    placeholder="Artist..."
                    onChange={(event) => setValue(event.target.value)}
                    className="input rounded-3xl h-11 w-72 px-6 py-2.5 text-base mb-3.5"
                />
                <Categories/>
                {filteredCountries.map((item, index) => (
                    <article className={`article1 p-1.5 border border-solid border-black max-w-none mb-1.5 overflow-y-hidden h-40 ${theme === 'dark' ? 'dark-article' : ''}`} key={index}>
                        <img className='img' src={item.artworkUrl100} alt='error'/>
                        <p className={`p1 ${theme === 'dark' ? 'dark-p' : ''}`}>{item.artistName}</p>
                        <p className={`p2 ${theme === 'dark' ? 'dark-p' : ''}`}>{item.trackName}</p>
                        <p className={`p3 ${theme === 'dark' ? 'dark-p' : ''}`}>{item.collectionName}</p>
                        <p className={`p4 ${theme === 'dark' ? 'dark-p' : ''}`}>{item.primaryGenreName}</p>
                        <div className='information'>
                            <h1><a className={` ${theme === 'dark' ? 'dark-a' : ''}`} href={item.trackViewUrl}>{item.artistName} - {item.trackName}</a> <img src="7990.png_300.png" alt="img"/></h1>
                            <div className='columns-2 pt-2.5'>
                            <p className={`${theme === 'dark' ? 'dark-p' : ''}`}><b className={`${theme === 'dark' ? 'dark-b' : ''}`}>{t('collection')}: </b>{item.collectionName}</p>
                            <p className={`${theme === 'dark' ? 'dark-p' : ''}`}><b className={`${theme === 'dark' ? 'dark-b' : ''}`}>{t('track_count')}: </b>{item.trackCount}</p>
                            <p className={`${theme === 'dark' ? 'dark-p' : ''}`}><b className={`${theme === 'dark' ? 'dark-b' : ''}`}>{t('price')}: </b>{item.collectionPrice} USD</p>
                            <p className={`${theme === 'dark' ? 'dark-p' : ''}`}><b className={`${theme === 'dark' ? 'dark-b' : ''}`}>{t('track_duration')}: </b>{TimeTrackMinutes(item.trackTimeMillis)}:{TimeTrackSecond(item.trackTimeMillis)} min</p>
                            <p className={`${theme === 'dark' ? 'dark-p' : ''}`}><b className={`${theme === 'dark' ? 'dark-b' : ''}`}>{t('track_price')}: </b>{item.trackPrice} USD</p>
                            </div>
                        </div>
                    </article>
                ))}</div>
        );
    }
}

export default Track;