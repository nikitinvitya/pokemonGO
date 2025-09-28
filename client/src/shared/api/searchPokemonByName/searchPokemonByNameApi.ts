import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchPokemonByNameApi = createApi({
  reducerPath: 'searchPokemonByNameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
  }),
  endpoints: (build) => ({
    fetchPokemonNames: build.query<
      string[],
      { partName: string; limit: number }
    >({
      query: ({ partName, limit }) => ({
        url: `search/`,
        params: {
          query: partName,
          limit,
        },
      }),
    }),
  }),
});
