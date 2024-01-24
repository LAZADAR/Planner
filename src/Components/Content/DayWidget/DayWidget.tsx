import React from 'react';
import { useAppSelector } from '../../../hooks';
import styles from './DayWidget.module.scss';
import WidgetObject from './WidgetObject/WidgetObject';
export type widgetDay = {
  timestamp: number;
  totalTodos?: number;
  completed?: number;
};

const DayWidget = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const start = currentDate.getTime();
  const todos = useAppSelector((state) => state.todoList.todoList);
  const sortedDays = todos.slice().sort((a, b) => {
    return a.date - b.date;
  });

  let counter = 0;
  const widgetDays: widgetDay[] = [];
  for (const todo of sortedDays) {
    if (todo.date > start) {
      const day = new Date(todo.date);
      day.setHours(0, 0, 0, 0);
      if (
        widgetDays
          ? !widgetDays.find((el) => el.timestamp === day.getTime())
          : false
      ) {
        widgetDays.push({ timestamp: day.getTime() });
        counter++;
      }

      if (counter > 2) break;
    }
  }
  for (const widget of widgetDays) {
    widget.totalTodos = 0;
    widget.completed = 0;
  }
  for (const todo of sortedDays) {
    const day = new Date(todo.date);

    day.setHours(0, 0, 0, 0);
    const finded = widgetDays.find((el) => el.timestamp === day.getTime());

    if (finded !== undefined) {
      finded.totalTodos!++;
      if (todo.completed) finded.completed!++;
    }
  }

  console.log(widgetDays);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Upcoming tasks</div>
      <div className={styles.content}>
        {widgetDays.map((day) => (
          <WidgetObject key={day.timestamp} widget={day} />
        ))}
      </div>
    </div>
  );
};

export default DayWidget;
