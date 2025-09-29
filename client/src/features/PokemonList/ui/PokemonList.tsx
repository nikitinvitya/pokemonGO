import cls from './PokemonList.module.scss';
import { getPokemonCardApi } from '@/shared/api/getPokemonCardApi/getPokemonCardApi';
import { PokemonCard } from '@/entities/pokemonCard/';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { useEffect } from 'react';
import { setTotalCount } from '@/features/Pagination/model/slice/paginationSlice';
import classNames from 'classnames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Error } from '@/shared/ui/Error/Error';
import { Loading } from '@/shared/ui/Loading/Loading';

interface PokemonListProps {
  className?: string;
}

export const PokemonList = ({ className }: PokemonListProps) => {
  const dispatch = useAppDispatch();
  const { cardsOnPage, currentPage } = useAppSelector(
    (state) => state.pagination,
  );

  useEffect(() => {
    document.title = 'Pokemons';
  }, []);

  const limit = cardsOnPage;
  const offset = cardsOnPage * (currentPage - 1);

  const { error, data, isLoading, isFetching } =
    getPokemonCardApi.useFetchAllPokemonCardsQuery({ limit, offset });

  useEffect(() => {
    if (data?.cards) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [currentPage, data?.cards]);

  useEffect(() => {
    if (data?.count !== undefined) {
      dispatch(setTotalCount(data.count));
    }
  }, [data, dispatch]);

  const pokemonCards = data?.cards;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className={classNames(cls.pokemonList, className)}>
      <h1>Pokemons</h1>
      {pokemonCards &&
        pokemonCards.map((card) => (
          <AppLink key={card.name} to={`pokemon/${card.name}`}>
            <PokemonCard
              name={card.name}
              image={card.image}
              types={card.types}
            />
          </AppLink>
        ))}
    </div>
  );
};
