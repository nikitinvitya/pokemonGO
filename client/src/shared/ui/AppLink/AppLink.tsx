import classNames from 'classnames';
import cls from './AppLink.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

interface AppLinkProps {
  children?: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}

export const AppLink = (props: AppLinkProps) => {
  const { to, className, children, onClick } = props;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={classNames(cls.appLink, className)}
    >
      {children}
    </Link>
  );
};
