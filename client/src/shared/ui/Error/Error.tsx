import classNames from 'classnames';
import cls from './Error.module.scss';
import { Button } from '@/shared/ui/Button/Button';

export const Error = () => {
  return (
    <div className={classNames(cls.error)}>
      <h1>Something went wrong</h1>
      <Button onClick={() => location.reload()} className={cls.reloadButton}>
        Reload page
      </Button>
    </div>
  );
};
