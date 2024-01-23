import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = {
  theme: boolean;
};
const initialState: Theme = {
  theme: true,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<boolean>) {
      localStorage.setItem('theme', `${action.payload}`);
      state.theme = action.payload;
    },
  },
});
export {};
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
