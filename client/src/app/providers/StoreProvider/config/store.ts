import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: {
      [pokemonCardApi.reducerPath]: pokemonCardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonCardApi.middleware),
    preloadedState: initialState,
  });
};
