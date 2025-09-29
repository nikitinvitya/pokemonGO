import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { PokemonPage } from '@/pages/PokemonPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

const enum AppRoutes {
  MAIN = 'main',
  POKEMON_PAGE = 'pokemon_page',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.POKEMON_PAGE]: 'pokemon/:name',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.POKEMON_PAGE]: {
    path: RoutePath.pokemon_page,
    element: <PokemonPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
