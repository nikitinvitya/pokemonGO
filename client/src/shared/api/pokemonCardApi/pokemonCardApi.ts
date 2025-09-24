import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonCardType } from '@/entities/pokemonCard';

export const pokemonCardApi = createApi({
  reducerPath: 'pokemonCardAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (build) => ({
    fetchAllPokemonCards: build.query<PokemonCardType[], void>({
      query: () => 'main',
    }),
  }),
});
