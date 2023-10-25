import {useTheme} from "./ThemeContext";
import {useTranslation} from "react-i18next";

const Categories = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    return (
        <div className="blog mb-1 p-1.5">
            <h2 className={`hML1 ${theme === 'dark' ? 'dark-hML' : ''}`}>{t('artist')}</h2>
            <h2 className={`hML2 ${theme === 'dark' ? 'dark-hML' : ''}`}>{t('track')}</h2>
            <h2 className={`hML3 ${theme === 'dark' ? 'dark-hML' : ''}`}>{t('collection')}</h2>
            <h2 className={`hML4 ${theme === 'dark' ? 'dark-hML' : ''}`}>{t('genre')}</h2>
        </div>
    );
};

export default Categories;