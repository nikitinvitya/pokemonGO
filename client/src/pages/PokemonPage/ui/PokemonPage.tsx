import { getPokemonPageApi } from '@/shared/api/getPokemonPageApi/getPokemonPageApi';
import { useParams } from 'react-router-dom';
import cls from './PokemonPage.module.scss';
import { normalizeName } from '@/shared/lib/normalizeName';
import { GaugeArc } from '@/shared/ui/GaugeArc/GaugeArc';
import { getPokemonNamesApi } from '@/shared/api/getPokemonNamesApi/getPokemonNamesApi';
import Arrow from '@/shared/assets/Arrow.svg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useEffect } from 'react';
import { Error } from '@/shared/ui/Error/Error';
import { Loading } from '@/shared/ui/Loading/Loading';
import { Image } from '@/shared/ui/Image/Image';
import { AbilitiesViewer } from '@/features/AbilitiesViewer/AbilitiesViewer';

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
    return <Loading />;
  }

  if (namesFetchError || PageFetchError) {
    return <Error />;
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
        <Image
          className={cls.image}
          src={data.sprites.frontDefault}
          alt={`${normalizeName(data.name)} front`}
          width={'80%'}
          height={'auto'}
        />
        <Image
          className={cls.image}
          src={data.sprites.backDefault}
          alt={`${normalizeName(data.name)} back`}
          width={'80%'}
          height={'auto'}
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

      <AbilitiesViewer abilities={data.abilities} />
    </div>
  );
};

export default PokemonPage;
