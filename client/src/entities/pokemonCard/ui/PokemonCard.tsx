import cls from './PokemonCard.module.scss';

interface pokemonCardProps {
  name: string;
  image: string;
  types: string[];
  className?: string;
}

export const PokemonCard = (props: pokemonCardProps) => {
  const { types, name, image } = props;
  return (
    <div className={cls.pokemonCard}>
      <img src={image} alt={`${name} photo`} />
      <p>{name}</p>
      {types.map((type) => (
        <span key={type}>{type}</span>
      ))}
    </div>
  );
};
