import { PokemonList } from '@/features/PokemonList';
import cls from './MainPage.module.scss';
import { Pagination } from '@/features/Pagination';

const MainPage = () => {
  return (
    <div className={cls.mainPage}>
      <PokemonList className={cls.pokemonList} />
      <Pagination />
    </div>
  );
};

export default MainPage;
