import React from 'react';
import styles from './AddTime.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useDispatch } from 'react-redux';
import { AddTodoTime } from '../../../../Store/TodoSlice';

interface time {
  hours?: string;
  minutes?: string;
}

const AddTime = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const todo = useAppSelector((state) => state.todo);
  const selected = useAppSelector((state) => state.selectDate);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<time>(
    todo.date
      ? {
          hours: new Date(todo.date).getHours().toString().padStart(2, '0'),
          minutes: new Date(todo.date).getMinutes().toString().padStart(2, '0'),
        }
      : {
          hours: new Date().getHours().toString().padStart(2, '0'),
          minutes: new Date().getMinutes().toString().padStart(2, '0'),
        }
  );
  const changeHourHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (!newValue) {
      setValue((prev) => ({
        ...prev,
        hours: '00',
      }));
    } else {
      newValue = Math.min(parseInt(newValue), 23).toString().padStart(2, '0');
      setValue((prev) => ({
        ...prev,
        hours: newValue,
      }));
    }
  };
  const changeMinutesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (!newValue) {
      setValue((prev) => ({
        ...prev,
        minutes: '00',
      }));
    } else {
      newValue = Math.min(parseInt(newValue), 59).toString().padStart(2, '0');
      setValue((prev) => ({
        ...prev,
        minutes: newValue,
      }));
    }
  };
  React.useEffect(() => {
    if (
      selected.selectedDay &&
      selected.selectedMonth &&
      selected.selectedYear &&
      value.hours &&
      value.minutes
    ) {
      const date = new Date(
        selected.selectedYear.id,
        selected.selectedMonth.id - 1,
        selected.selectedDay.id,
        parseInt(value.hours!),
        parseInt(value.minutes!)
      );

      if (date && !isNaN(date.getTime())) {
        dispatch(AddTodoTime(date.getTime()));
      }
    }
  }, [value]);
  return (
    <div className={`${styles.container} ${theme && styles.darkmode}`}>
      <input
        maxLength={2}
        placeholder={new Date().getHours().toString()}
        className={styles.timeinput}
        onChange={changeHourHandler}
        value={value.hours}
        type="number"
      />
      <input
        maxLength={2}
        placeholder={new Date().getMinutes().toString()}
        onChange={changeMinutesHandler}
        className={styles.timeinput}
        value={value.minutes}
        type="number"
      />
    </div>
  );
};

export default AddTime;
