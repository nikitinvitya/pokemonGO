import { PokemonList } from '@/features/PokemonList';
import cls from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={cls.mainPage}>
      <PokemonList />
    </div>
  );
};

export default MainPage;
