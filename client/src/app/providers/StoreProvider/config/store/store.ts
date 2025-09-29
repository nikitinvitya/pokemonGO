import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from '../types/StateSchema';
import { getPokemonCardApi } from '@/shared/api/getPokemonCardApi/getPokemonCardApi';
import { paginationSlice } from '@/features/Pagination';
import { getPokemonPageApi } from '@/shared/api/getPokemonPageApi/getPokemonPageApi';
import { searchPokemonByNameApi } from '@/shared/api/searchPokemonByName/searchPokemonByNameApi';
import { getPokemonNamesApi } from '@/shared/api/getPokemonNamesApi/getPokemonNamesApi';

const rootReducer = combineReducers({
  [getPokemonCardApi.reducerPath]: getPokemonCardApi.reducer,
  [getPokemonPageApi.reducerPath]: getPokemonPageApi.reducer,
  [searchPokemonByNameApi.reducerPath]: searchPokemonByNameApi.reducer,
  [getPokemonNamesApi.reducerPath]: getPokemonNamesApi.reducer,
  pagination: paginationSlice,
});

const apis = [
  getPokemonCardApi,
  getPokemonPageApi,
  searchPokemonByNameApi,
  getPokemonNamesApi,
];
const middlewares = apis.map((api) => api.middleware);

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
    preloadedState: initialState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
