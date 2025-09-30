import cls from './PokemonCard.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';
import { Image } from '@/shared/ui/Image/Image';

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
      <Image src={image} alt={`${name} photo`} width={'100%'} height={'auto'} />
      <p>{normalizeName(name)}</p>
      <p className={cls.types}>
        {types.map((type) => (
          <span key={type}>{type} </span>
        ))}
      </p>
    </div>
  );
};
