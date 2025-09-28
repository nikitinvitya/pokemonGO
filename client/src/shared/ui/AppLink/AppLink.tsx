import classNames from 'classnames';
import cls from './AppLink.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

interface AppLinkProps {
  children?: React.ReactNode;
  to: string;
  className?: string;
}

export const AppLink = (props: AppLinkProps) => {
  const { to, className, children } = props;
  return (
    <Link to={to} className={classNames(cls.appLink, className)}>
      {children}
    </Link>
  );
};
