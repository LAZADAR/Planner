import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Month, DaysData, Year } from '../../../../Components/Calendar/Data';
import styles from './WidgetObject.module.scss';
import { widgetDay } from '../DayWidget';
import { Selection, selectDate } from '../../../../Store/SelectionDate';
import { AddTodoTime } from '../../../../Store/TodoSlice';

export type widget = {
  widget: widgetDay;
};
const WidgetObject: React.FC<widget> = (props) => {
  const dispatch = useAppDispatch();
  const [selectedTime, setSelectedTime] = React.useState<number | null>(null);
  const todo = useAppSelector((state) => state.todo);
  const selectedDate = useAppSelector((state) => state.selectDate);
  const theme = useAppSelector((state) => state.theme.theme);
  const fullname = DaysData.find(
    (el) => el.id === new Date(props.widget.timestamp).getDay()
  )?.fullname;

  const month = Month.find(
    (el) => el.id === new Date(props.widget.timestamp).getMonth() + 1
  );
  console.log(month);

  const year = Year.find(
    (el) => el.id === new Date(props.widget.timestamp).getFullYear()
  );
  console.log(year);
  const day = new Date(props.widget.timestamp).getDate();
  console.log(day);
  const GoToDay: Selection = {
    selectedMonth: {
      name: month!.name,
      id: month!.id,
    },
    selectedYear: {
      name: year!.name,
      id: year!.id,
    },
    selectedDay: {
      id: day,
    },
  };
  React.useEffect(() => {
    if (
      selectedDate.selectedDay &&
      selectedDate.selectedMonth &&
      selectedDate.selectedYear &&
      selectedTime !== null
    ) {
      const date = new Date(
        selectedDate.selectedYear.id,
        selectedDate.selectedMonth.id - 1,
        selectedDate.selectedDay.id,
        new Date(selectedTime).getHours(),
        new Date(selectedTime).getMinutes()
      );

      dispatch(AddTodoTime(date.getTime()));
    }
  }, [dispatch, selectedDate, selectedTime]);

  return (
    <div
      onClick={() => {
        dispatch(selectDate(GoToDay));
        if (todo.date) {
          const time = new Date(todo.date);
          const newtime = new Date(
            selectedDate.selectedYear.id,
            selectedDate.selectedMonth.id - 1,
            selectedDate.selectedDay.id,
            time.getHours(),
            time.getMinutes()
          );

          setSelectedTime(newtime.getTime());
        }
      }}
      className={`${styles.widget} ${theme && styles.darkmode}`}
    >
      <div className={styles.top}>
        <div className={styles.time}>
          <p className={styles.fullName}>{fullname}</p>
          <p>{`${new Date(props.widget.timestamp).getDate()}.${String(
            new Date(props.widget.timestamp).getMonth() + 1
          ).padStart(2, '0')}.${new Date(
            props.widget.timestamp
          ).getFullYear()}`}</p>
        </div>
        <div className={styles.total}>{props.widget.totalTodos}</div>
      </div>

      <div className={styles.middle}>
        <div className={styles.done}>
          <p>Done</p>
        </div>

        <div className={styles.todo}>
          <p>To do</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.Score}>{props.widget.completed}</p>
        <div className={styles.bar}>
          <div
            style={{
              width: `${
                (props.widget.completed! / props.widget.totalTodos!) * 100
              }%`,
            }}
            className={styles.thumb}
          ></div>
        </div>
        <p className={styles.Score}>{`${
          props.widget.totalTodos! - props.widget.completed!
        }`}</p>
      </div>
    </div>
  );
};

export default WidgetObject;
