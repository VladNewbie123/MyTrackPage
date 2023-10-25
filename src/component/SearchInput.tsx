import React, { useState, ChangeEvent } from 'react';
import {useTheme} from "./ThemeContext";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
    onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { theme } = useTheme();
    const history = useNavigate();


    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        onSearch(newQuery);

        // Устанавливаем параметры URL при изменении ввода
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('query', newQuery);
        window.history.pushState({}, '', `?${searchParams.toString()}`);

        // Переход на страницу "Track" с параметром запроса
        history(`/track?query=${newQuery}`);
    };


    return (
        <div>
            <input
                type="search"
                placeholder="Artist..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`input ${theme === 'dark' ? 'dark-input' : ''}`}
            />
        </div>
    );
};

export default SearchInput;

