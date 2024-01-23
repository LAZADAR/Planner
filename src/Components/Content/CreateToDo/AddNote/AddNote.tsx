import React from 'react';
import styles from './AddNote.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AddTodoNote } from '../../../../Store/TodoSlice';
const AddNote: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState(todo.note || '');
  React.useEffect(() => {
    dispatch(AddTodoNote(value));
  }, [value]);
  return (
    <div
      className={
        !theme
          ? `${styles.container}`
          : `${styles.container} ${styles.darkmode}`
      }
    >
      <textarea
        placeholder="Type something..."
        className={styles.note}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        name="note"
        id="note"
      ></textarea>
    </div>
  );
};

export default AddNote;
