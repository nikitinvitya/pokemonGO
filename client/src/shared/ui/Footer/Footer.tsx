import cls from './Footer.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  return (
    <div className={classNames(cls.footer)}>
      &copy; Viktar Nikitsin | BSU 2025
    </div>
  );
};
