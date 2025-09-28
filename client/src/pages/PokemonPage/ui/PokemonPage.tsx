import { pokemonPageApi } from '@/shared/api/pokemonPageApi/pokemonPageApi';
import { useParams } from 'react-router-dom';
import cls from './PokemonPage.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';
import { GaugeArc } from '@/shared/ui/GaugeArc/GaugeArc';

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
      <h1>{normalizeName(data.name)}</h1>
      <div className={cls.images}>
        <h2>Photos</h2>
        <img
          src={data.sprites.frontDefault}
          alt={`${normalizeName(data.name)} front`}
        />
        <img
          src={data.sprites.backDefault}
          alt={`${normalizeName(data.name)} back`}
        />
      </div>

      <div className={cls.pokemonLook}>
        <span>Height: {data.height} dm</span>
        <span>Weight: {data.weight} hg</span>
      </div>

      <div>
        <p>
          Types:
          {data.types.map((type) => (
            <span
              key={type.type.name}
            >{` ${type.type.name}${data.types.length > 1 ? ', ' : ''}`}</span>
          ))}
        </p>
      </div>

      <div className={cls.stats}>
        <h2>Stats</h2>
        {data.stats.map((stat) => (
          <div className={cls.stat} key={stat.stat.name}>
            <GaugeArc
              value={stat.baseStat}
              max={100}
              size={220}
              strokeWidth={18}
              duration={1000}
            />
            <p>{normalizeName(stat.stat.name)}</p>
          </div>
        ))}
      </div>

      <div className={cls.abilities}>
        <h2>Abilities</h2>
        {data.abilities.map((ability) => (
          <div className={cls.ability} key={ability.ability.name}>
            <p className={cls.abilityName}>
              {normalizeName(ability.ability.name)}
            </p>
            <p>
              {ability.description
                ? ability.description
                : 'Description  is missing'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
