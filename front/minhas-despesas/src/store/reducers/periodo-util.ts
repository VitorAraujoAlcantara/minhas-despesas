import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ClonarPeriodoDto } from '../../models/clonar-periodo-dto';
import { PeriodoDto } from '../../models/periodo-dto';
import { post } from '../api';

const ACESSO_INVALIDO = 'Acesso inválido.';
const ACESSO_NAO_AUTORIZADO = 'Acesso não autorizado.';


interface InitialState {
    cloning: boolean;
    clonned: boolean;
    erro?: string;
    periodo?: PeriodoDto;
    unauthorized?: boolean;
}


const initialState: InitialState = {
    cloning: false,
    clonned: false,
    periodo: undefined,
    erro: undefined,
    unauthorized: undefined
};

export const clonePeriodo = createAsyncThunk('clonePeriodo', async (data: ClonarPeriodoDto) => {
    const response = await post<ClonarPeriodoDto, PeriodoDto>(`Periodo/Clonar`, data);
    return response;
});


const periodoUtil = createSlice({
    name: 'clonePeriodo',
    initialState,
    reducers: {
        clearData: state => {
            state.cloning = false;
            state.clonned = false;
            state.erro = undefined;
            state.periodo = undefined;
            state.unauthorized = undefined;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(clonePeriodo.pending, state => {
                state.cloning = true;
                state.erro = '';
                state.clonned = false;
                state.periodo = undefined;
            })
            .addCase(clonePeriodo.fulfilled, (state, action: PayloadAction<PeriodoDto>) => {
                state.cloning = false;
                state.erro = '';
                state.clonned = true;
                state.periodo = action.payload;
            })
            .addCase(clonePeriodo.rejected, (state, action) => {

                state.erro = action.error.message;
                if (action.error.message === ACESSO_INVALIDO || action.error.message === ACESSO_NAO_AUTORIZADO) {
                    state.unauthorized = true;
                }

                state.cloning = false;
                state.clonned = false;
            })


    },
})



export const { clearData } = periodoUtil.actions;
export default periodoUtil;