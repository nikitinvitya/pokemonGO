import cls from './PokemonList.module.scss';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { PokemonCard } from '@/entities/pokemonCard/';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { useEffect } from 'react';
import { setTotalCount } from '@/features/Pagination/model/slice/paginationSlice';

export const PokemonList = () => {
  const dispatch = useAppDispatch();
  const { cardsOnPage, currentPage } = useAppSelector(
    (state) => state.pagination,
  );

  const limit = cardsOnPage;
  const offset = cardsOnPage * (currentPage - 1);

  const { error, data, isLoading } =
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

  return (
    <div className={cls.pokemonList}>
      {pokemonCards &&
        pokemonCards.map((card) => (
          <PokemonCard
            key={card.name}
            name={card.name}
            image={card.image}
            types={card.types}
          />
        ))}
    </div>
  );
};
