import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonFullInfo } from '@/entities/pokemonCard';
import { camelizeKeys } from '@/shared/lib/camelizeKeys';

export const getPokemonPageApi = createApi({
  reducerPath: 'pokemonPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/pokemon/',
  }),
  endpoints: (build) => ({
    fetchPokemonPageInfo: build.query<PokemonFullInfo, { pokemonName: string }>(
      {
        query: ({ pokemonName }) => ({
          url: `${pokemonName}`,
        }),
        transformResponse: (response: unknown): PokemonFullInfo => {
          return camelizeKeys(response) as PokemonFullInfo;
        },
      },
    ),
  }),
});
