import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ENTRIES_PER_PAGE } from "../../constants";

interface PagesState {
  totalPages: number;
  currentPage: number;
}

const initialState = {
  totalPages: 1,
  currentPage: 1,
} satisfies PagesState as PagesState;

const pagesSlice = createSlice({
  name: "characterCount",
  initialState,
  reducers: {
    setPagesFromNewSearchResult: (state, action: PayloadAction<number>) => {
      const resultCount = action.payload;
      const totalPages = Math.ceil(resultCount / ENTRIES_PER_PAGE);
      return {
        totalPages: totalPages,
        currentPage: 1,
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      return {
        ...state,
        currentPage: newPage,
      };
    },
  },
});

export const { setPagesFromNewSearchResult, setCurrentPage } =
  pagesSlice.actions;
export default pagesSlice.reducer;
