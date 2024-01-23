import React from 'react';
import CalendarIcon from '../../Icons/CalendarIcon';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Timer from '../Timer/Timer';
import styles from './Header.module.scss';
import { useAppSelector } from '../../hooks';
import Calendar from '../Calendar/Calendar';
const Header: React.FC = () => {
  const [showCalendar, setShowCalenar] = React.useState(false);
  const state = useAppSelector((state) => state.theme.theme);
  const calendarHandler = () => {
    setShowCalenar((prev) => !prev);
  };
  return (
    <div
      className={
        !state ? styles.container : `${styles.container} ${styles.darkmode}`
      }
    >
      <div className={styles.leftside}>
        <h2>Plnr</h2>
        <ThemeToggle />
        <Button
          open={<Calendar onMouseLeave={calendarHandler} />}
          description="Calendar"
        >
          <CalendarIcon />
        </Button>
      </div>
      <div className={styles.rightside}>
        <Timer />
        <p style={{ fontWeight: '800' }}>Hello</p>
        <p className={styles.time}>Dylan Grace</p>
      </div>
    </div>
  );
};

export default Header;
