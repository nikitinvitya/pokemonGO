import { PokemonList } from '@/features/PokemonList';
import cls from './MainPage.module.scss';
import { Pagination } from '@/features/Pagination';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';

const MainPage = () => {
  return (
    <div className={cls.mainPage}>
      <ThemeSwitcher />
      <PokemonList />
      <Pagination />
    </div>
  );
};

export default MainPage;
