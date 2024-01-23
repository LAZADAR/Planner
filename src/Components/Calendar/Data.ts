type date = {
  id: number;
  name: string;
  IsSelected: boolean;
};
type days = {
  id: number;
  name: string;
  fullname?: string;
};
export const DaysData: Array<days> = [
  {
    id: 1,
    name: 'Mo',
    fullname: 'Monday',
  },
  {
    id: 2,
    name: 'Tu',
    fullname: 'Tuesday',
  },
  {
    id: 3,
    name: 'We',
    fullname: 'Wednesday',
  },
  {
    id: 4,
    name: 'Th',
    fullname: 'Thursday',
  },
  {
    id: 5,
    name: 'Fr',
    fullname: 'Friday',
  },
  {
    id: 6,
    name: 'Sa',
    fullname: 'Saturday',
  },
  {
    id: 0,
    name: 'Su',
    fullname: 'Monday',
  },
];

export const Month: Array<date> = [
  { id: 1, name: 'January', IsSelected: true },
  { id: 2, name: 'February', IsSelected: false },
  { id: 3, name: 'March', IsSelected: false },
  { id: 4, name: 'April', IsSelected: false },
  { id: 5, name: 'May', IsSelected: false },
  { id: 6, name: 'June', IsSelected: false },
  { id: 7, name: 'July', IsSelected: false },
  { id: 8, name: 'August', IsSelected: false },
  { id: 9, name: 'September', IsSelected: false },
  { id: 10, name: 'Octobre', IsSelected: false },
  { id: 11, name: 'November', IsSelected: false },
  { id: 12, name: 'December', IsSelected: false },
];
export const Year: Array<date> = [
  { id: 2024, name: '2024', IsSelected: true },
  { id: 2025, name: '2025', IsSelected: false },
  { id: 2026, name: '2026', IsSelected: false },
  { id: 2027, name: '2027', IsSelected: false },
  { id: 2028, name: '2028', IsSelected: false },
];
