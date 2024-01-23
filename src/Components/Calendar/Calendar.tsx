import React from 'react';
import styles from './Calendar.module.scss';
import { DaysData, Month, Year } from './Data';
import { SelectedDate } from './getCurrentData';
import { getDaysInMonth, DayObject } from './getDays';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectDate } from '../../Store/SelectionDate';
import { AddTodoTime } from '../../Store/TodoSlice';
type openMenu = {
  year: boolean;
  month: boolean;
};
interface calendar extends React.PropsWithChildren {
  onMouseLeave: () => void;
}
const Calendar: React.FC<calendar> = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const selectionState = useAppSelector((state) => state.selectDate);
  const todo = useAppSelector((state) => state.todo);
  const todos = useAppSelector((state) => state.todoList.todoList);
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] =
    React.useState<SelectedDate>(selectionState);

  const [openMenu, setOpenMenu] = React.useState<openMenu>({
    year: false,
    month: false,
  });

  const [days, setDays] = React.useState<DayObject[]>();

  const monthMenuRef = React.useRef<HTMLDivElement>(null);
  const yearMenuRef = React.useRef<HTMLDivElement>(null);

  const monthOpenHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenMenu((prev) => {
      return { ...prev, month: !prev.month };
    });
  };

  const yearOpenHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenMenu((prev) => {
      return { ...prev, year: !prev.year };
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    const isOutsideMonthMenu =
      openMenu.month &&
      monthMenuRef.current &&
      !monthMenuRef.current.contains(event.target as Node);

    const isOutsideYearMenu =
      openMenu.year &&
      yearMenuRef.current &&
      !yearMenuRef.current.contains(event.target as Node);

    console.log(isOutsideMonthMenu + ' | ' + isOutsideYearMenu);

    if (isOutsideMonthMenu || isOutsideYearMenu) {
      console.log('MUST CLOSE');
      setOpenMenu({
        year: false,
        month: false,
      });
    }
  };

  React.useEffect(() => {
    dispatch(selectDate(selectedDate));
    setDays(() => {
      const newDays = getDaysInMonth(
        selectedDate.selectedYear.id!,
        selectedDate.selectedMonth.id!,
        todos
      );
      return newDays;
    });
    if (todo.date) {
      const time = new Date(todo.date);
      const newtime = new Date(
        selectedDate.selectedYear.id,
        selectedDate.selectedMonth.id - 1,
        selectedDate.selectedDay.id,
        time.getHours(),
        time.getMinutes()
      );

      dispatch(AddTodoTime(newtime.getTime()));
    }
  }, [selectedDate, dispatch, todos, todo.date]);

  React.useEffect(() => {
    console.log('OPENED MENU : ' + openMenu.month + ' ' + openMenu.year);

    if (openMenu.month || openMenu.year) {
      console.log('added listener');

      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      console.log('Removed listener');
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div
      onMouseLeave={props.onMouseLeave}
      className={`${styles.Calendar} ${theme && styles.darkmode}`}
    >
      <div className={styles.header}>
        <button onClick={monthOpenHandler} className={styles.selection}>
          {selectedDate.selectedMonth.name}
          {openMenu.month && (
            <div
              onClick={(event) => {
                const target = event.target as HTMLDivElement;
                const selection = target.closest(`.${styles.option}`);

                const textContent = selection?.textContent;
                if (textContent)
                  setSelectedDate({
                    ...selectedDate,
                    selectedMonth: {
                      id: Month.find((el) => el.name === textContent)!.id,
                      name: textContent,
                    },
                  });
              }}
              ref={monthMenuRef}
              className={`${styles.dropdown} ${theme && styles.darkmode}`}
            >
              {Month.map((el) => {
                if (selectedDate.selectedMonth.id === el.id)
                  return (
                    <div
                      key={el.id}
                      className={`${styles.option} ${styles.selected}`}
                    >
                      {el.name}
                    </div>
                  );
                else
                  return (
                    <div key={el.id} className={styles.option}>
                      {el.name}
                    </div>
                  );
              })}
            </div>
          )}
        </button>
        <button onClick={yearOpenHandler} className={styles.selection}>
          {selectedDate.selectedYear.name}
          {openMenu.year && (
            <div
              onClick={(event) => {
                const target = event.target as HTMLDivElement;
                const selection = target.closest(`.${styles.option}`);

                const textContent = selection?.textContent;
                if (textContent)
                  setSelectedDate({
                    ...selectedDate,
                    selectedYear: {
                      id: Year.find((el) => el.name === textContent)!.id,
                      name: textContent,
                    },
                  });
              }}
              ref={yearMenuRef}
              className={
                !theme
                  ? `${styles.dropdown}`
                  : `${styles.dropdown} ${styles.darkmode}`
              }
            >
              {Year.map((el) => {
                if (selectedDate.selectedYear.id === el.id)
                  return (
                    <div
                      key={el.id}
                      className={`${styles.option} ${styles.selected}`}
                    >
                      {el.name}
                    </div>
                  );
                else
                  return (
                    <div key={el.id} className={styles.option}>
                      {el.name}
                    </div>
                  );
              })}
            </div>
          )}
        </button>
      </div>
      <div
        onClick={(event) => {
          const target = event.target as HTMLDivElement;
          const selection = target.closest(`.${styles.day}`);
          if (selection?.textContent)
            setSelectedDate({
              ...selectedDate,
              selectedDay: { id: parseInt(selection.textContent) },
            });
        }}
        className={styles.days}
      >
        {DaysData.map((day) => (
          <div key={day.id} className={styles.dayOfWeek}>
            {day.name}
          </div>
        ))}

        {days?.map((day, index) => {
          if (day.day === 0) {
            return <div key={index} className={styles.disabled}></div>;
          }
          if (day.day === selectedDate.selectedDay.id)
            return (
              <div key={index} className={`${styles.day} ${styles.selected}`}>
                {day.day}
              </div>
            );
          else
            return (
              <div
                key={index}
                className={
                  day.isTodo ? `${styles.day} ${styles.isTodo}` : styles.day
                }
              >
                {day.day}
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Calendar;
