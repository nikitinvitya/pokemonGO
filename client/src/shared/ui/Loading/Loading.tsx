import cls from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={cls.loadingWrapper}>
      <span className={cls.loader}></span>
    </div>
  );
};
