import {
    IconButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import {useTranslation} from "react-i18next";

function LanguageSwitcher() {

    const {i18n} = useTranslation();


    const toggleLanguage = () => {

        const language =
            i18n.language === "en"
                ? "uk"
                : "en";

        void i18n.changeLanguage(language);

        localStorage.setItem(
            "language",
            language,
        );
    };
    return (
        <IconButton onClick={toggleLanguage}>
            <LanguageIcon/>
            {i18n.language === "en"
                ? "EN"
                : "УК"}
        </IconButton>
    );
}

export default LanguageSwitcher;