import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from '../types/StateSchema';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { paginationSlice } from '@/features/Pagination';

const rootReducer = combineReducers({
  [pokemonCardApi.reducerPath]: pokemonCardApi.reducer,
  pagination: paginationSlice,
});

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonCardApi.middleware),
    preloadedState: initialState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
