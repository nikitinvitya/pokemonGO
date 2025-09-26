import { pokemonPageApi } from '@/shared/api/PokemonPageApi/pokemonPageApi';
import { useParams } from 'react-router-dom';
import cls from './PokemonPage.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';

const PokemonPage = () => {
  const { name: pokemonName } = useParams<{ name: string }>();

  const { data, error, isLoading } =
    pokemonPageApi.useFetchPokemonPageInfoQuery({
      pokemonName: pokemonName,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <div className={cls.pokemonPage}>
      <div className={cls.images}>
        <p>Photos</p>
        <img
          src={data.sprites.frontDefault}
          alt={`${normalizeName(data.name)} front`}
        />
        <img
          src={data.sprites.backDefault}
          alt={`${normalizeName(data.name)} back`}
        />
      </div>
      <hr />
      <div className={cls.pokemonLook}>
        <span>Height: {data.height}</span>
        <span>Weight: {data.weight}</span>
      </div>
      <hr />

      <div className={cls.stats}>
        {data.stats.map((stat) => (
          <div className={cls.stat} key={stat.stat.name}>
            <p>{stat.baseStat}</p>
            <p>{stat.stat.name}</p>
          </div>
        ))}
      </div>
      <hr />

      <div className={cls.abilities}>
        {data.abilities.map((ability) => (
          <div className={cls.ability} key={ability.ability.name}>
            {ability.ability.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
