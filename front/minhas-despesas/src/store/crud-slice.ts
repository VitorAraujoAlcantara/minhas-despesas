import { createSlice, PayloadAction, createAsyncThunk, Draft, AsyncThunk, Slice, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { PaginatedFilterDataQuery } from '../models/paginated-filter-data-query';
import { PaginationResponse } from '../models/pagination-reponse';
import { ValidationError } from '../models/validation-error';
// import { PaginatedFilterDataQuery, PaginationResponse, ValidationError } from '../models';

import crudApi from './crud-api';

const ACESSO_INVALIDO = 'Acesso inválido.';
const ACESSO_NAO_AUTORIZADO = 'Acesso não autorizado.';
export interface CrudSliceType<CrudType, CrudFilterType, CrudErrorsType, CrudCreateType> {
    getItemsByFilter: AsyncThunk<PaginationResponse<CrudType>, PaginatedFilterDataQuery<CrudFilterType>, {}>;
    getEntityById: AsyncThunk<CrudType, string, {}>;
    deleteEntityById: AsyncThunk<void, string, {}>;
    update: AsyncThunk<CrudType, CrudCreateType, {}>;
    create: AsyncThunk<CrudType, CrudCreateType, {}>;
    slice: Slice<CrudState<CrudType, CrudFilterType, CrudErrorsType>, {
        clearData: (state: WritableDraft<CrudState<CrudType, CrudFilterType, CrudErrorsType>>) => void;
    }, string>;
    clearData: ActionCreatorWithoutPayload<string>;
}

interface CrudState<CrudType, CrudFilterType, CrudErrorsType> {
    entity?: CrudType;
    data?: PaginationResponse<CrudType> | undefined;
    dataFilter?: PaginatedFilterDataQuery<CrudFilterType> | undefined;
    erro?: string | undefined;
    loading?: boolean | undefined;
    fetched?: boolean | undefined;
    created?: boolean | undefined;
    updated?: boolean | undefined;
    deleted?: boolean | undefined;
    entityErros?: ValidationError<CrudErrorsType> | undefined;
    unauthorized?: boolean;
}



function CrudSlice<CrudType, CrudFilterType, CrudErrorsType, CrudCreateType>(
    prefix: string,
    keyFieldName: string
): CrudSliceType<CrudType, CrudFilterType, CrudErrorsType, CrudCreateType> {



    const initialState: CrudState<CrudType, CrudFilterType, CrudErrorsType> = {
        entity: undefined,
        data: undefined,
        dataFilter: {
            itensPerPage: 10,
            order: '',
            page: 1,
            filter: ({} as CrudFilterType)
        },
        erro: '',
        loading: false,
        created: false,
        updated: false,
        deleted: false,
        fetched: false,
        entityErros: undefined,
        unauthorized: false
    }

    const api = crudApi<CrudType, CrudFilterType, CrudCreateType>(prefix);

    const update = createAsyncThunk(`${prefix}/update`, async (data: CrudCreateType) => {
        const response = await api.update((data as any)[keyFieldName], data);
        return response;
    });

    const create = createAsyncThunk(`${prefix}/create`, async (data: CrudCreateType) => {
        const response = await api.create(data);
        return response;
    });

    const getItemsByFilter = createAsyncThunk(`${prefix}/getItemsByFilter`, async (filter: PaginatedFilterDataQuery<CrudFilterType>) => {
        const response = await api.getByFilter(filter);
        return response;
    })

    const getEntityById = createAsyncThunk(`${prefix}/getEntityById`, async (id: string) => {
        const response = await api.getById(id);
        return response;
    })

    const deleteEntityById = createAsyncThunk(`${prefix}/deleteEntityById`, async (id: string) => {
        const response = await api.deleteData(id);
        return response;
    })

    const slice = createSlice({
        name: prefix,
        initialState,
        reducers: {
            clearData: state => {
                state.entity = undefined;
                state.erro = undefined;
                state.loading = false;
                state.created = false;
                state.updated = false;
                state.deleted = false;
                state.entityErros = undefined;
                state.unauthorized = false;
            },
        },
        extraReducers: (builder) => {
            builder

                .addCase(create.pending, state => {
                    state.loading = true;
                    state.erro = '';
                    state.created = false;
                    state.entityErros = undefined;
                    state.unauthorized = false;
                })
                .addCase(create.fulfilled, (state, action: PayloadAction<CrudType>) => {
                    state.entity = (action.payload as Draft<CrudType>);
                    state.loading = false;
                    state.created = true;
                    state.entityErros = undefined;
                })
                .addCase(create.rejected, (state, action) => {
                    try {
                        state.entityErros = JSON.parse(String(action.error.message));
                    }
                    catch (e) {
                        state.erro = action.error.message;
                        if (action.error.message === ACESSO_INVALIDO || action.error.message === ACESSO_NAO_AUTORIZADO) {
                            state.unauthorized = true;
                        }
                    }
                    state.loading = false;
                    state.created = false;
                })

                .addCase(update.pending, state => {
                    state.loading = true;
                    state.erro = '';
                    state.updated = false;
                    state.entityErros = undefined;
                    state.unauthorized = false;
                })
                .addCase(update.fulfilled, (state, action: PayloadAction<CrudType>) => {
                    state.entity = (action.payload as Draft<CrudType>);
                    state.loading = false;
                    state.updated = true;
                    state.entityErros = undefined;
                })
                .addCase(update.rejected, (state, action) => {
                    try {
                        state.entityErros = JSON.parse(String(action.error.message));
                    }
                    catch (e) {
                        state.erro = action.error.message;
                        if (action.error.message === ACESSO_INVALIDO || action.error.message === ACESSO_NAO_AUTORIZADO) {
                            state.unauthorized = true;
                        }
                    }
                    state.loading = false;
                    state.updated = false;
                })


                .addCase(getItemsByFilter.pending, (state, action) => {
                    state.loading = true;
                    state.erro = '';
                    state.fetched = false;
                    state.entityErros = undefined;
                    state.dataFilter = (action.meta.arg as Draft<PaginatedFilterDataQuery<CrudFilterType>>);
                    state.unauthorized = false;
                })
                .addCase(getItemsByFilter.fulfilled, (state, action: PayloadAction<PaginationResponse<CrudType>>) => {
                    state.data = action.payload as Draft<PaginationResponse<CrudType>>;
                    state.loading = false;
                    state.fetched = true;
                    state.entityErros = undefined;
                    if (state.dataFilter) {
                        state.dataFilter.page = action.payload.pageInfo.currentPage;
                    }
                })
                .addCase(getItemsByFilter.rejected, (state, action) => {
                    try {
                        state.entityErros = JSON.parse(String(action.error.message));
                    }
                    catch (e) {
                        state.erro = action.error.message;
                        if (action.error.message === ACESSO_INVALIDO || action.error.message === ACESSO_NAO_AUTORIZADO) {
                            state.unauthorized = true;
                        }
                    }
                    state.loading = false;
                    state.fetched = false;

                })

                .addCase(getEntityById.pending, state => {
                    state.entity = undefined;
                    state.loading = true;
                    state.erro = '';
                    state.unauthorized = false;
                })
                .addCase(getEntityById.fulfilled, (state, action: PayloadAction<CrudType>) => {
                    state.entity = action.payload as Draft<CrudType>;
                    state.loading = false;
                })
                .addCase(getEntityById.rejected, (state, action) => {
                    state.erro = action.error.message;
                    state.loading = false;
                    if (action.error.message === ACESSO_INVALIDO || action.error.message === ACESSO_NAO_AUTORIZADO) {
                        state.unauthorized = true;
                    }
                })

                .addCase(deleteEntityById.pending, state => {
                    state.loading = true;
                    state.erro = '';
                    state.deleted = false;
                    state.unauthorized = false;
                })
                .addCase(deleteEntityById.fulfilled, (state) => {
                    state.deleted = true;
                    state.loading = false;
                })
                .addCase(deleteEntityById.rejected, (state, action) => {
                    state.erro = action.error.message;
                    state.loading = false;
                    state.deleted = false;
                })
        },
    })

    return {
        getItemsByFilter,
        getEntityById,
        deleteEntityById,
        update,
        create,
        slice,
        clearData: slice.actions.clearData
    }
}

export default CrudSlice;