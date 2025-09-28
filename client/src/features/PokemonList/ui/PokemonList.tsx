import cls from './PokemonList.module.scss';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { PokemonCard } from '@/entities/pokemonCard/';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { useEffect } from 'react';
import { setTotalCount } from '@/features/Pagination/model/slice/paginationSlice';
import classNames from 'classnames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

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
    pokemonCardApi.useFetchAllPokemonCardsQuery({ limit, offset });

  useEffect(() => {
    if (data?.count !== undefined) {
      dispatch(setTotalCount(data.count));
    }
  }, [data, dispatch]);

  const pokemonCards = data?.cards;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(cls.pokemonList, className)}>
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
