import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from '../types/StateSchema';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { paginationSlice } from '@/features/Pagination';
import { pokemonPageApi } from '@/shared/api/pokemonPageApi/pokemonPageApi';
import { searchPokemonByNameApi } from '@/shared/api/searchPokemonByName/searchPokemonByNameApi';

const rootReducer = combineReducers({
  [pokemonCardApi.reducerPath]: pokemonCardApi.reducer,
  [pokemonPageApi.reducerPath]: pokemonPageApi.reducer,
  [searchPokemonByNameApi.reducerPath]: searchPokemonByNameApi.reducer,
  pagination: paginationSlice,
});

const apis = [pokemonCardApi, pokemonPageApi, searchPokemonByNameApi];
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
