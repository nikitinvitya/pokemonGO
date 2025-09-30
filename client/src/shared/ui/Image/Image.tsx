import classNames from 'classnames';
import cls from './Image.module.scss';
import { useTheme } from '@/app/providers/ThemeProvider';
import { ImgHTMLAttributes, useState, useEffect } from 'react';
// Убедитесь, что импорт SVG настроен для рендера как React-компонент
import NotFoundDark from '@/shared/assets/NotFoundDark.svg';
import NotFoundLight from '@/shared/assets/NotFoundLight.svg';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string; // Лучше сделать необязательным для обработки null/undefined
  alt: string;
  className?: string;
  fallback?: string;
}

export const Image = (props: ImageProps) => {
  const { theme } = useTheme();
  const { src, fallback, alt, className, width, height, ...otherProps } = props;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const onHandleError = () => {
    setHasError(true);
  };

  if (hasError || !src) {
    if (fallback) {
      return (
        <img
          className={classNames(cls.Image, className)}
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          {...otherProps}
        />
      );
    }

    return theme === 'light' ? (
      <NotFoundDark
        width={width}
        height={height}
        className={classNames(cls.image, className)}
      />
    ) : (
      <NotFoundLight
        width={width}
        height={height}
        className={classNames(cls.image, className)}
      />
    );
  }

  return (
    <img
      className={classNames(cls.Image, className)}
      src={src}
      onError={onHandleError}
      alt={alt}
      {...otherProps}
    />
  );
};
