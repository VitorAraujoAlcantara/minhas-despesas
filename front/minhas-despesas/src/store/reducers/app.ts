import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const LOCAL_STORAGE_THEME_KEY = 'APP_THEME'
interface AppState {
    version: string;
    name: string;
    contaId: string;
    theme: string;
}

const initialState: AppState = {
    name: 'Minhas despesas',
    version: '1.0.0-alpha',
    contaId: '',
    theme: 'royal'
}

export const appSlice = createSlice({
    name: 'app-slice',
    initialState,
    reducers: {
        setContaId: (state, action: PayloadAction<string>) => {
            state.contaId = action.payload
        },
        clearContaId: state => {
            state.contaId = ''
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
        getThemeFromLocalStorage: state => {
            state.theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? 'default';
        },
        setThemeToLocalStorage: state => {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, state.theme);
        }
    },
});

export const { setContaId, clearContaId, setTheme, getThemeFromLocalStorage, setThemeToLocalStorage } = appSlice.actions;
export default appSlice