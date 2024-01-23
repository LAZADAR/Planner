import { Month, Year } from './Data';
export type SelectedDate = {
  selectedMonth: {
    name: string;
    id: number;
  };
  selectedYear: {
    name: string;
    id: number;
  };
  selectedDay: {
    id: number;
  };
};
export const currentDate = (): SelectedDate => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // Додаємо 1, оскільки місяці в JavaScript починаються з 0
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();
  return {
    selectedMonth: {
      name: Month.find((el) => el.id === currentMonth)!.name,
      id: currentMonth,
    },
    selectedYear: {
      name: currentYear.toString(),
      id: currentYear,
    },
    selectedDay: {
      id: currentDay,
    },
  };
};
export {};
