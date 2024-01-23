import React from 'react';
import CompleteIcon from '../../../Icons/CompleteIcon';
import Button from '../../../Components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  RemoveTodos,
  Todo,
  ToggleDoneTodo,
  UpdateTodos,
} from '../../../Store/TodosSlice';

import styles from './Todo.module.scss';
import RemoveIcon from '../../../Icons/RemoveIcon';
import { removeTodo, toggleTodoCompleted } from '../../../DataBase';
interface content {
  todo: Todo;
  completed: boolean;
}
const TodoObject: React.FC<content> = (props) => {
  const hours = new Date(props.todo.date).getHours();
  const minutes = new Date(props.todo.date).getMinutes();
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoList.todoList);
  const CompleteHandle = async () => {
    try {
      await toggleTodoCompleted(props.todo.id);
    } catch (error) {
      console.log(error);
    }
    dispatch(ToggleDoneTodo(props.todo.id));
  };
  const RemoveHandle = async () => {
    try {
      await removeTodo(props.todo.id);
    } catch (error) {
      console.log(error);
    }
    dispatch(RemoveTodos(props.todo.id));
  };

  return (
    <div
      onDoubleClick={CompleteHandle}
      className={` ${styles.Todo} ${theme && styles.darkmode} ${
        props.completed && styles.completed
      }`}
    >
      <div className={styles.top}>
        <p className={styles.time}>{`${String(hours).padStart(2, '0')}:${String(
          minutes
        ).padStart(2, '0')}`}</p>
        <p className={styles.title}>{`${props.todo.title}`}</p>
        <Button onClick={CompleteHandle} description="Done">
          <CompleteIcon />
        </Button>
        <div className={styles.right}>
          <Button
            onClick={() => {
              RemoveHandle();
            }}
            description="Remove"
          >
            <RemoveIcon />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        {props.todo.note ? (
          <p className={styles.note}>{props.todo.note}</p>
        ) : null}
      </div>
    </div>
  );
};

export default TodoObject;
