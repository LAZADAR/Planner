import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentDate } from '../Components/Calendar/getCurrentData';
export type Selection = {
  selectedMonth: {
    name: string;
    id: number;
  };
  selectedYear: {
    name: string;
    id: number;
  };
  selectedDay: {
    id: number;
  };
};
const initialState: Selection = currentDate();
const themeSlice = createSlice({
  name: 'SelectDate',
  initialState,
  reducers: {
    selectDate(state, action: PayloadAction<Selection>) {
      state.selectedYear = action.payload.selectedYear;
      state.selectedMonth = action.payload.selectedMonth;
      state.selectedDay = action.payload.selectedDay;
    },
  },
});
export {};
export const { selectDate } = themeSlice.actions;
export default themeSlice.reducer;
