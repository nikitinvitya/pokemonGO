import classNames from 'classnames';
import cls from './NavBar.module.scss';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';
import { Link } from 'react-router-dom';
import pokeapiLogo from '@/shared/assets/pokeapi.png';

export const NavBar = () => {
  return (
    <div className={classNames(cls.navBar)}>
      <Link to="/" className={cls.logo}>
        <img src={pokeapiLogo} alt="PokeAPI logo" />
      </Link>
      <ThemeSwitcher />
    </div>
  );
};
