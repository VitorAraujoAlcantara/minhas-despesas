import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    version: string ;
    name: string;
    contaId: string;
}

const initialState : AppState ={
    name: 'Minhas despesas',
    version: '1.0.0-alpha',
    contaId: ''
}

export const appSlice = createSlice({
    name: 'app-slice',
    initialState,
    reducers:{
        setContaId: (state, action: PayloadAction<string>) => {
            state.contaId = action.payload
        },
        clearContaId: state => {
            state.contaId = ''
        }
    },
});

export const { setContaId, clearContaId } = appSlice.actions;
export default appSlice