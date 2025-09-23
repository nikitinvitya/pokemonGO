import { lazy } from 'react';

export const CurrentPokemonPageAsync = lazy(
  () => import('./CurrentPokemonPage'),
);
