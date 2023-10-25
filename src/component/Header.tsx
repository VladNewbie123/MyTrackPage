import React, {useState} from 'react';
import {useTheme} from './ThemeContext';
import {useTranslation} from 'react-i18next';
import {Routes, Route, Link} from "react-router-dom";

import {Track} from '../pages/Track'
import {NotFound} from "../pages/NotFound";

const Header = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const {theme, toggleTheme} = useTheme();
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };


    const toggleAndChangeBodyTheme = () => {
        toggleTheme(); // Переключение темы

        // Добавление/удаление класса к body
        document.body.classList.toggle('dark-body', theme === 'light');
    };

    return (
        <>
            <header className={`header ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <nav className={`header_nav ${isOpen ? 'active' : ''} ${theme === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
                    <ul className="header_nav_list">
                        <li className="header_nav-item"><Link className="header_a" to="/">{t('home')}</Link></li>
                        <li className="header_nav-item"><Link className="header_a" to="/track">{t('track')}</Link></li>
                        <li className="header_nav-item"><Link className="header_a" to="/">{t('audioBook')}</Link></li>
                    </ul>
                </nav>
                <button className={`burger-btn ${isOpen ? 'active' : ''}`}
                        onClick={() => setOpen(!isOpen)}>
                    <span className="line"/>
                    <span className="line"/>
                    <span className="line"/>
                </button>
                <button className="button_theme" onClick={toggleAndChangeBodyTheme}>{` ${theme === 'dark' ? t('lightTheme') : t('darkTheme')}`}</button>

                <button className="language-button" onClick={() => changeLanguage('en')}>English</button>

                <button className="language-button" onClick={() => changeLanguage('uk')}>Українська</button>
            </header>
            <Routes>
                <Route path="/track" element={<Track/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
};

export default Header;