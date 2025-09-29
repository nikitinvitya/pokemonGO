import { getPokemonPageApi } from '@/shared/api/getPokemonPageApi/getPokemonPageApi';
import { useParams } from 'react-router-dom';
import cls from './PokemonPage.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';
import { GaugeArc } from '@/shared/ui/GaugeArc/GaugeArc';
import { getPokemonNamesApi } from '@/shared/api/getPokemonNamesApi/getPokemonNamesApi';
import Arrow from '@/shared/assets/Arrow.svg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useEffect } from 'react';

const PokemonPage = () => {
  const { name: pokemonName } = useParams<{ name: string }>();

  const {
    data,
    error: PageFetchError,
    isLoading: isLoadingPage,
  } = getPokemonPageApi.useFetchPokemonPageInfoQuery({
    pokemonName: pokemonName,
  });

  const {
    data: names,
    error: namesFetchError,
    isLoading: isNamesLoading,
  } = getPokemonNamesApi.useFetchAllPokemonNamesQuery();

  useEffect(() => {
    if (!data) return;
    document.title = normalizeName(data.name);
  }, [data]);

  if (isLoadingPage || isNamesLoading) {
    return <div>Loading...</div>;
  }

  if (namesFetchError || PageFetchError) {
    return <div>Error</div>;
  }

  const currentIndex = names.findIndex((name) => name === pokemonName);
  const nextIndex = currentIndex === names.length - 1 ? 0 : currentIndex + 1;
  const prevIndex = currentIndex === 0 ? names.length - 1 : currentIndex - 1;

  return (
    <div className={cls.pokemonPage}>
      <AppLink
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className={cls.nextLink}
        to={`/pokemon/${names[nextIndex]}`}
      >
        <Arrow className={cls.next} />
      </AppLink>
      <AppLink
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className={cls.prevLink}
        to={`/pokemon/${names[prevIndex]}`}
      >
        <Arrow className={cls.prev} />
      </AppLink>
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
              key={stat.stat.name + data.name}
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
