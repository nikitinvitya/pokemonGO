import cls from './PokemonList.module.scss';
import { pokemonCardApi } from '@/shared/api/pokemonCardApi/pokemonCardApi';
import { PokemonCard } from '@/entities/pokemonCard/';

export const PokemonList = () => {
  const {
    error,
    data: pokemonCards,
    isLoading,
  } = pokemonCardApi.useFetchAllPokemonCardsQuery();

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
