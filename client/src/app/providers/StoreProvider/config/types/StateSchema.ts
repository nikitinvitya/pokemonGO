import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { PaginationState } from '@/features/PokemonList';

export interface StateSchema {
  [pokemonCardApi.reducerPath]: ReturnType<typeof pokemonCardApi.reducer>;
  pagination: PaginationState;
}
