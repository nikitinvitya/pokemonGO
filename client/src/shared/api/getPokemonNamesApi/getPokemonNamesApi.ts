import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getPokemonNamesApi = createApi({
  reducerPath: 'pokemonNamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (build) => ({
    fetchAllPokemonNames: build.query<string[], void>({
      query: () => ({
        url: `pokemonNames/`,
      }),
    }),
  }),
});
