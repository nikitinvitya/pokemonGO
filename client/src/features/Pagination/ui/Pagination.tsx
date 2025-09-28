import cls from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { setPage } from '@/features/Pagination';
import { Button, ButtonShape, ButtonSize } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import SearchDark from '@/shared/assets/SearchDark.svg';
import SearchLight from '@/shared/assets/SearchLight.svg';
import { useTheme } from '@/app/providers/ThemeProvider';
import React, { useState } from 'react';

export const Pagination = () => {
  const { cardsOnPage, currentPage, totalCount } = useAppSelector(
    (state) => state.pagination,
  );
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(totalCount / cardsOnPage);
  const [inputPage, setInputPage] = useState('');

  const onPageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setInputPage('');
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const onButtonClick = () => {
    const page = Number(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={cls.pagination}>
      <div className={cls.paginationButtonList}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span key={idx}>. . .</span>
          ) : (
            <Button
              key={idx}
              shape={ButtonShape.circle}
              size={ButtonSize.size_m}
              className={cls.paginationButton}
              onClick={() => onPageChange(+page)}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <div className={cls.goToPage}>
        <p>Go to page:</p>
        <Input
          value={inputPage}
          onChange={onInputChange}
          className={cls.goToPageInput}
          placeholder="page"
        />
        <Button
          onClick={onButtonClick}
          className={cls.goToPageButton}
          size={ButtonSize.size_m}
        >
          {theme === 'light' ? (
            <SearchDark className={cls.search} />
          ) : (
            <SearchLight className={cls.search} />
          )}
        </Button>
      </div>
    </div>
  );
};
