import cls from './NotFoundPage.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/Button/Button';

const NotFoundPage = () => {
  return (
    <div className={cls.notFound}>
      <h1>Page not found</h1>
      <Button className={cls.homeButton}>
        <AppLink to={'/'} className={cls.homeLink}>
          <p>Go to main page</p>
        </AppLink>
      </Button>
    </div>
  );
};

export default NotFoundPage;
