import cls from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { setPage } from '@/features/Pagination';
import { Button, ButtonShape, ButtonSize } from '@/shared/ui/Button/Button';

export const Pagination = () => {
  const { cardsOnPage, currentPage, totalCount } = useAppSelector(
    (state) => state.pagination,
  );
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(totalCount / cardsOnPage);

  const onPageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(setPage(page));
  };

  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className={cls.pagination}>
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={idx} className={cls.ellipsis}>
            ...
          </span>
        ) : (
          <Button
            key={idx}
            shape={ButtonShape.circle}
            size={ButtonSize.size_m}
            className={cls.page_btn}
            onClick={() => onPageChange(+page)}
          >
            {page}
          </Button>
        ),
      )}
    </div>
  );
};
