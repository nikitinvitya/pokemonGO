import cls from './PokemonCard.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';

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
      <p>{normalizeName(name)}</p>
      <p className={cls.types}>
        {types.map((type) => (
          <span key={type}>{type} </span>
        ))}
      </p>
    </div>
  );
};
