import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';

export interface StateSchema {
  [pokemonCardApi.reducerPath]: ReturnType<typeof pokemonCardApi.reducer>;
}
