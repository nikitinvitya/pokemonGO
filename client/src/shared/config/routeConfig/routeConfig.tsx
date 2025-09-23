import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { CurrentPokemonPage } from '@/pages/CurrentPokemonPage';

const enum AppRoutes {
  MAIN = 'main',
  CurrentPokemon = 'pokemon',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.CurrentPokemon]: '/pokemon',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.CurrentPokemon]: {
    path: RoutePath.pokemon,
    element: <CurrentPokemonPage />,
  },
};
