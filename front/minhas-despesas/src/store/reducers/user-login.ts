import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginDto } from "../../models/login-dto";
import { UserLoginDto } from "../../models/user-login-dto";
import { post } from "../api";
const LOCAL_STORAGE_USER_LOGIN = 'USER_LOGIN';

interface InitialState {
    currentUser? : UserLoginDto,
    loging: boolean,
    logged: boolean,
    erro?: string
}

export const login = createAsyncThunk('login', async (data: LoginDto) => {
    const response = await post<LoginDto, UserLoginDto>(`Login`, data);
    return response;
});

const initialState: InitialState = {
    currentUser: undefined,
    loging: false,
    logged: false,
    erro: undefined
}


const userLogin = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearData: state => {
            state.currentUser = undefined;
            state.loging = false;
            state.logged = false;
            state.erro = undefined;
        },  
        clearLogged: state => {
            state.logged = false;
        },
        clearLocalStorage: state => {
            if ( localStorage.getItem(LOCAL_STORAGE_USER_LOGIN)){
                localStorage.removeItem(LOCAL_STORAGE_USER_LOGIN);
            }
        },
        getLoginFromStorage: state => {
            const response = localStorage.getItem(LOCAL_STORAGE_USER_LOGIN);
            let ret: UserLoginDto|undefined = undefined;
            try {
                if ( ! response){
                    return;
                }
                ret =  JSON.parse(response);
                state.currentUser = ret;

            } catch (error) {
                return
            }    
        },
        setLoginToLocalStorage: (state, action: PayloadAction<UserLoginDto>) => {
            localStorage.setItem(LOCAL_STORAGE_USER_LOGIN, JSON.stringify(action.payload));
        }
    },
    extraReducers: ( builder) => {
        builder

            .addCase( login.pending, state => {
                state.loging = true;
                state.logged = false;
                state.currentUser = undefined;
            })
            .addCase( login.fulfilled, (state, action: PayloadAction<UserLoginDto>) => {
                state.loging = false;
                state.logged = true;
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.erro = action.error.code === '404' ? 'E-mail ou senha inválida' : action.error.message;
                state.logged = false;
                state.loging = false;
            })            
    }

})

export const { clearData, clearLogged, getLoginFromStorage, setLoginToLocalStorage ,clearLocalStorage} = userLogin.actions;
export default userLogin;
