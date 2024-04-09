import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CharacterCountState {
  count: number;
}

const initialState = {
  count: 0,
} satisfies CharacterCountState as CharacterCountState;

const characterCountSlice = createSlice({
  name: "characterCount",
  initialState,
  reducers: {
    setCharacterCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCharacterCount } = characterCountSlice.actions;
export default characterCountSlice.reducer;
