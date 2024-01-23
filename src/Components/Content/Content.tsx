import React from 'react';
import styles from './Content.module.scss';
import { useAppSelector } from '../../hooks';
import CreateToDo from './CreateToDo/CreateToDo';
import TodoObject from './Todo/TodoObject';
import DayWidget from './DayWidget/DayWidget';

const Content: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const todos = useAppSelector((state) => state.todoList.todoList);
  const date = useAppSelector((state) => state.selectDate);
  const selectedDate = new Date(
    date.selectedYear.id,
    date.selectedMonth.id - 1,
    date.selectedDay.id
  ).getTime();

  const filteredTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.date).getTime();

    return todoDate > selectedDate && todoDate < selectedDate + 86400000;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (a.completed === b.completed) {
      if (!a.completed && !b.completed) {
        return a.date - b.date;
      }

      return 0;
    }

    return a.completed ? 1 : -1;
  });
  return (
    <div
      className={
        !theme ? styles.container : `${styles.container} ${styles.darkmode}`
      }
    >
      <div className={styles.DaysBar}>
        <DayWidget />
      </div>
      <div className={styles.Main}>
        <div className={styles.createToDo}>
          <h2>What's your plan?</h2>
          <CreateToDo />
        </div>
        <div className={styles.ToDoList}>
          {sortedTodos.map((todo) => (
            <TodoObject completed={todo.completed} key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
