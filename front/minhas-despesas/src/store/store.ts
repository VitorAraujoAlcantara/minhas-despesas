import { configureStore } from '@reduxjs/toolkit'
import appSlice from './reducers/app';
import { despesaCrudSlice } from './reducers/despesa';
import { despesaPagamentoCrudSlice } from './reducers/despesa-pagamento';
import { grupoDespesaCrudSlice } from './reducers/grupo-despesa';
import userLogin from './reducers/user-login';
import { periodoCrudSlice } from './reducers/periodo';
import periodoUtil from './reducers/periodo-util';


const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    grupoDespesa: grupoDespesaCrudSlice.slice.reducer,
    periodo: periodoCrudSlice.slice.reducer,
    despesa: despesaCrudSlice.slice.reducer,
    despesaPagamento: despesaPagamentoCrudSlice.slice.reducer,
    periodoUtil: periodoUtil.reducer,
    userLogin: userLogin.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;