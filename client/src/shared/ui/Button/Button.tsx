import cls from './Button.module.scss';
import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  shape?: ButtonShape;
  size?: ButtonSize;
}

export enum ButtonShape {
  circle = 'circle',
}

export enum ButtonSize {
  size_m = 'size_m',
  size_l = 'size_l',
  size_xl = 'size_xl',
}

export const Button = (props: ButtonProps) => {
  const { className, children, shape, size, onClick, ...otherProps } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(className, cls[shape], cls[size])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
