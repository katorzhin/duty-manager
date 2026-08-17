import {createRoot} from 'react-dom/client'
import './index.css'
import './i18n/i18n';
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AppThemeProvider} from "./theme/AppThemeProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppThemeProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppThemeProvider>
    </LocalizationProvider>
)
