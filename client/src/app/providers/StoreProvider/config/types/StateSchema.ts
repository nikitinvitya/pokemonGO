import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { PaginationState } from '@/features/PokemonList';
import { pokemonPageApi } from '@/shared/api/pokemonPageApi/pokemonPageApi';
import { searchPokemonByNameApi } from '@/shared/api/searchPokemonByName/searchPokemonByNameApi';

export interface StateSchema {
  [pokemonCardApi.reducerPath]: ReturnType<typeof pokemonCardApi.reducer>;
  [pokemonPageApi.reducerPath]: ReturnType<typeof pokemonPageApi.reducer>;
  [searchPokemonByNameApi.reducerPath]: ReturnType<
    typeof searchPokemonByNameApi.reducer
  >;
  pagination: PaginationState;
}
