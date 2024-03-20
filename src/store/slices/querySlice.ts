import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SearchCharactersParams } from "../apis/charactersApi";

type QueryType = "ALL" | "SEARCH";

interface QueryState {
  type: QueryType;
  parameters: SearchCharactersParams | null;
}

const initialState = {
  type: "ALL",
  parameters: null,
} satisfies QueryState as QueryState;

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    resetQuery: (state) => {
      state = initialState;
    },
    setSearchQuery: (state, action: PayloadAction<SearchCharactersParams>) => {
      state.type = "SEARCH";
      state.parameters = action.payload;
    },
  },
});

export const { resetQuery, setSearchQuery } = querySlice.actions;
export default querySlice.reducer;
