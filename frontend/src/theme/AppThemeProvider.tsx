import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

import { ThemeProvider } from "@mui/material/styles";

import {
    lightTheme,
    darkTheme
} from "./themes";
import {CssBaseline} from "@mui/material";

type ThemeContextType = {
    toggleTheme: () => void;
    darkMode: boolean;
};

const ThemeContext =
    createContext<ThemeContextType>(
        {} as ThemeContextType
    );

export const useAppTheme = () =>
    useContext(ThemeContext);

type Props = {
    children: React.ReactNode;
};

export function AppThemeProvider({
                                     children
                                 }: Props) {

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("theme")
            === "dark"
        );

    const toggleTheme = () => {

        const newValue = !darkMode;

        setDarkMode(newValue);

        localStorage.setItem(
            "theme",
            newValue ? "dark" : "light"
        );
    };

    const theme = useMemo(
        () => darkMode
            ? darkTheme
            : lightTheme,
        [darkMode]
    );

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}