import classNames from 'classnames';
import cls from './Input.module.scss';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export const Input = (props: InputProps) => {
  const { className, placeholder, ...otherProps } = props;
  return (
    <input
      placeholder={placeholder}
      className={classNames(cls.input, className)}
      {...otherProps}
    />
  );
};
