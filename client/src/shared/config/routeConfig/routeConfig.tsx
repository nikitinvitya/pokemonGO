import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { PokemonPage } from '@/pages/PokemonPage';

const enum AppRoutes {
  MAIN = 'main',
  POKEMON_PAGE = 'pokemon',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.POKEMON_PAGE]: 'pokemon/:name',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.POKEMON_PAGE]: {
    path: RoutePath.pokemon,
    element: <PokemonPage />,
  },
};
