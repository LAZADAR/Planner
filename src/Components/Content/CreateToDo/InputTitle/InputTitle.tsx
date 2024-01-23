import React from 'react';
import styles from './InputTitle.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AddTodoTitle } from '../../../../Store/TodoSlice';

const InputTitle: React.FC = () => {
  const [value, setValue] = React.useState('');
  const text = useAppSelector((state) => state.todo.title);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(AddTodoTitle(value));
  }, [value, dispatch]);
  return (
    <>
      <input
        autoComplete="off"
        id="todoInput"
        placeholder="Title..."
        className={styles.ToDoInput}
        onChange={(event) => setValue(event.target.value)}
        value={text}
      ></input>
    </>
  );
};

export default InputTitle;
