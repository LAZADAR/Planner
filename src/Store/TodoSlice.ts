import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Todo = {
  id?: number;
  title?: string;
  note?: string;
  date?: number;
  completed?: boolean;
};

const initialState: Todo = {
  completed: false,
  date: new Date().getTime(),
};

const TodoSlice = createSlice({
  name: 'CreateTodo',
  initialState,
  reducers: {
    AddTodoID(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    AddTodoTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    AddTodoNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
    },
    AddTodoTime(state, action: PayloadAction<number>) {
      state.date = action.payload;
    },
  },
});
export {};
export const { AddTodoID, AddTodoTitle, AddTodoNote, AddTodoTime } =
  TodoSlice.actions;
export default TodoSlice.reducer;
