import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CARDS_ON_PAGE } from '@/shared/const/pokemons';

export interface PaginationState {
  currentPage: number;
  cardsOnPage: number;
  totalCount: number;
}

const initialState: PaginationState = {
  cardsOnPage: CARDS_ON_PAGE,
  currentPage: 1,
  totalCount: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
  },
});

export const { setPage, setTotalCount } = paginationSlice.actions;
export default paginationSlice.reducer;
