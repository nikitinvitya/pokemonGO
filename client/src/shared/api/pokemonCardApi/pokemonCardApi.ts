import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse } from '@/entities/pokemonCard';

export const pokemonCardApi = createApi({
  reducerPath: 'pokemonCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (build) => ({
    fetchAllPokemonCards: build.query<
      PokemonListResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: 'main',
        params: {
          limit,
          offset,
        },
      }),
    }),
  }),
});
