import React from 'react';
import styles from './Validation.module.scss';
import { useAppSelector } from '../../hooks';
interface Validations extends React.PropsWithChildren {
  description: string;
  appear: boolean;
  status: boolean;
}
const Validation: React.FC<Validations> = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <div
      className={
        props.appear
          ? props.status
            ? `${styles.validation} ${styles.appear} ${styles.added} ${
                theme && styles.darkmode
              }`
            : `${styles.validation} ${styles.appear} ${
                theme && styles.darkmode
              }`
          : `${styles.validation} ${theme && styles.darkmode}`
      }
    >
      {props.description}
    </div>
  );
};

export default Validation;
