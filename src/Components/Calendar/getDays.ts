import { Todo } from '../../Store/TodosSlice';

export interface DayObject {
  day: number;
  selected: boolean;
  dayOfWeek: number;
  Todos?: Todo[];
  isTodo?: boolean;
}

export const getDaysInMonth = (
  year: number,
  month: number,
  isTodos: Todo[]
): DayObject[] => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const daysInMonth: DayObject[] = [];
  const todosDays: Todo[] = [];
  for (const todo of isTodos) {
    const validDate = new Date(todo.date);
    if (validDate < endDate && validDate > startDate) {
      todosDays.push(todo);
    }
  }

  for (let day = startDate.getDate(); day <= endDate.getDate(); day++) {
    const dayOfWeek = new Date(year, month - 1, day).getDay();
    daysInMonth.push({
      day,
      selected: false,
      dayOfWeek,
      isTodo: todosDays.find((el) => day === new Date(el.date).getDate())
        ? true
        : false,
    });
  }

  const reverseArr = daysInMonth.slice().reverse();

  if (daysInMonth[0].dayOfWeek === 0) {
    for (let index = 1; index < 7; index++) {
      reverseArr.push({ day: 0, selected: false, dayOfWeek: 0 });
    }
  } else {
    let j = 1;
    while (j < daysInMonth[0].dayOfWeek) {
      reverseArr.push({ day: 0, selected: false, dayOfWeek: 0 });
      j++;
    }
  }
  const result = reverseArr.reverse();
  if (result[6].day === 0) result.slice(7);

  return result;
};
export {};
