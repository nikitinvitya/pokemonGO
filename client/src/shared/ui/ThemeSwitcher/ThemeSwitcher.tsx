import cls from './ThemeSwitcher.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import DarkTheme from '@/shared/assets/DarkTheme.svg';
import classNames from 'classnames';
import { useTheme } from '@/app/providers/ThemeProvider';

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  console.log(theme);
  return (
    <Button className={classNames(cls.themeSwitcher)} onClick={toggleTheme}>
      {theme === 'light' ? (
        <DarkTheme className={cls.icon} />
      ) : (
        <DarkTheme className={cls.icon} />
      )}
    </Button>
  );
};
