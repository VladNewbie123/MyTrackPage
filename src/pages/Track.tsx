import React, {useEffect, useState} from 'react';
import Categories from "../component/Categories";
import axios from 'axios'
import {Models} from "../models";
import {useTheme} from "../component/ThemeContext";
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import SearchInput from "../component/SearchInput";

const Track = () => {
    const [openArticle, setOpenArticle] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Models[] | null>();
    const [value, setValue] = useState("");
    const {theme} = useTheme();
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState(''); // Стейт для запроса поиска


    const filteredCountries = (items || []).filter((item) => {
        return item.artistName.toLowerCase().includes(value.toLowerCase());
    });

// Вычислите начальный и конечный индексы для текущей страницы
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

// Фильтруйте элементы на основе текущей страницы
    const currentItems = filteredCountries.slice(startIndex, endIndex);

    const toggleArticle = (index: number) => {
        if (openArticle === index) {
            // Закрываем текущий article
            setOpenArticle(null);
        } else {
            // Открываем новый article
            setOpenArticle(index);
        }
    };

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

    // Функция для выполнения поиска на основе параметров URL
    const performSearchFromURL = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('query');
        if (query) {
            setValue(query);
        }
    };

    // useEffect для выполнения поиска при загрузке страницы
    useEffect(() => {
        fetchData(i18n.language); // Вызываем fetchData с текущим языком
        performSearchFromURL(); // Вызываем performSearchFromURL при загрузке страницы
    }, [i18n.language]);

    // useEffect для выполнения поиска при изменении параметров URL
    useEffect(() => {
        performSearchFromURL(); // Вызываем performSearchFromURL при изменении URL
    }, [window.location.search]);

    // Функция для выполнения поиска
    const handleSearch = (query: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('query', query);
        window.history.pushState({}, '', `?${searchParams.toString()}`);

        setSearchQuery(query); // Обновляем запрос поиска
        setCurrentPage(0); // Сбрасываем текущую страницу при новом поиске
        setValue(query);
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        console.log(filteredCountries)
        return (
            <div className='pt-20 pb-4 px-0'>
                <SearchInput onSearch={handleSearch}/>
                <Categories/>
                {currentItems.map((item, index) => (
                    <article className={`article1  ${openArticle === index ? 'expanded' : ''} ${theme === 'dark' ? 'dark-article' : ''}`} key={index} >
                        <img className='img' src={item.artworkUrl100} alt='img'/>
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
                        <button className={`arrow-btn ${openArticle === index ? 'active' : ''} ${theme === 'dark' ? 'dark-arrow-btn' : ''}`} onClick={() => toggleArticle(index)}/>
                    </article>
                ))}
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={Math.ceil(filteredCountries.length / itemsPerPage)}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={`pagination ${theme === 'dark' ? 'dark-pagination' : ''}`}
                        activeClassName={'active'}
                    />
                </div>
        );
    }
}

export {Track};