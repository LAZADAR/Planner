import React from 'react';
import styles from './ThemeToggle.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleTheme } from '../../Store/themeSlice';
const ThemeToggle: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [themeStatus, setThemeStatus] = React.useState(theme);
  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setThemeStatus(event.target.checked);

  React.useEffect(() => {
    dispatch(toggleTheme(!themeStatus));
  }, [themeStatus, dispatch]);
  return (
    <div>
      <label
        className={
          themeStatus ? styles.theme : `${styles.theme} ${styles.dark}`
        }
        htmlFor="theme"
      ></label>
      <input
        onChange={handleChange}
        className={styles.themeInput}
        id="theme"
        type="checkbox"
        checked={themeStatus}
      />
    </div>
  );
};

export default ThemeToggle;
