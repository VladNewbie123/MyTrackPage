import React from 'react';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const NotFound = () => {
    const {t} = useTranslation();
    return (
        <div className="not-found-container">
            <h1 className="not-found-text">{t('404h')}</h1>
            <p className="w-auto pb-5">{t('404p')}</p>
            <ul className="not-found-links">
                <li className="not-found-link-item">
                    <Link to="/track" className="not-found-link">{t('track')}</Link>
                </li>
            </ul>
        </div>
    );
};

export {NotFound};