import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import todoReducer from './TodoSlice';
import selectDate from './SelectionDate';
import Todos from './TodosSlice';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectDate: selectDate,
    todo: todoReducer,
    todoList: Todos,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
