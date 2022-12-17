import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    version: string ;
    name: string;
    contaId: string;
}

const initialState : AppState ={
    name: 'Minhas despesas',
    version: '1.0.0-alpha',
    contaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
}

export const appSlice = createSlice({
    name: 'app-slice',
    initialState,
    reducers:{

    },
});

export default appSlice