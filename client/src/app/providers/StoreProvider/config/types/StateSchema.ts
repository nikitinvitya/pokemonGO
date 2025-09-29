import { getPokemonCardApi } from '@/shared/api/getPokemonCardApi/getPokemonCardApi';
import { PaginationState } from '@/features/PokemonList';
import { getPokemonPageApi } from '@/shared/api/getPokemonPageApi/getPokemonPageApi';
import { searchPokemonByNameApi } from '@/shared/api/searchPokemonByName/searchPokemonByNameApi';
import { getPokemonNamesApi } from '@/shared/api/getPokemonNamesApi/getPokemonNamesApi';

export interface StateSchema {
  [getPokemonCardApi.reducerPath]: ReturnType<typeof getPokemonCardApi.reducer>;
  [getPokemonPageApi.reducerPath]: ReturnType<typeof getPokemonPageApi.reducer>;
  [searchPokemonByNameApi.reducerPath]: ReturnType<
    typeof searchPokemonByNameApi.reducer
  >;
  [getPokemonNamesApi.reducerPath]: ReturnType<
    typeof getPokemonNamesApi.reducer
  >;
  pagination: PaginationState;
}
