import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
  id: number;
  title: string;
  note?: string;
  date: number;
  completed: boolean;
};
export type TodosState = {
  todoList: Todo[];
};
const initialState: TodosState = {
  todoList: [],
};

const TodoSlice = createSlice({
  name: 'Todos',
  initialState,
  reducers: {
    UpdateTodos(state, action: PayloadAction<TodosState>) {
      state.todoList = action.payload.todoList;
    },
    RemoveTodos(state, action: PayloadAction<number>) {
      state.todoList = state.todoList.filter((el) => el.id !== action.payload);
    },
    ToggleDoneTodo(state, action: PayloadAction<number>) {
      const todo = state.todoList.find((el) => el.id === action.payload);
      if (todo)
        state.todoList.find((el) => el.id === action.payload)!.completed =
          !todo?.completed;
    },
  },
});
export {};
export const { ToggleDoneTodo, UpdateTodos, RemoveTodos } = TodoSlice.actions;
export default TodoSlice.reducer;
