import React from 'react';
import styles from './CreateToDo.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Button from '../../../Components/Button/Button';
import AddToDoIcon from '../../../Icons/AddToDoIcon';
import TimeIcon from '../../../Icons/TimeIcon';
import NoteIcon from '../../../Icons/NoteIcon';
import AddNote from './AddNote/AddNote';
import AddTime from './AddTime/AddTime';
import { AddTodoID, AddTodoNote, AddTodoTitle } from '../../../Store/TodoSlice';
import { addTodo, Todo } from '../../../DataBase';

import InputTitle from './InputTitle/InputTitle';
import Validation from '../../../Components/Validation/Validation';
import { UpdateTodos } from '../../../Store/TodosSlice';
const CreateToDo = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const todo = useAppSelector((state) => state.todo);
  const todos = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  const [validation, setValidation] = React.useState(true);
  const [description, setdescription] = React.useState('Title is required');
  const [ButtonClick, setButtonClick] = React.useState({
    NoteOpen: false,
    TimeOpen: false,
  });

  const ToggleTimeHandler = () => {
    setButtonClick({ ...ButtonClick, TimeOpen: !ButtonClick.TimeOpen });
  };
  const CreateTodo = (): Todo => {
    const id = new Date().getTime();
    dispatch(AddTodoID(id));
    return {
      id: id,
      completed: false,
      date: todo.date ? todo.date : new Date().getTime(),
      title: `${todo.title}`,
      note: todo.note,
    };
  };
  const [validationTimerId, setValidationTimerId] = React.useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const clearTimout = () => {
    if (validationTimerId !== undefined) {
      clearTimeout(validationTimerId);
    }
  };
  const handleAddTodo = async (todoData: Todo) => {
    try {
      await addTodo(todoData);
      setdescription('Todo is Added');
      setValidation(false);

      const timerId: NodeJS.Timeout = setTimeout(
        () => setValidation(true),
        3000
      );
      setValidationTimerId(timerId);
    } catch (error) {
      console.error(error);
      setdescription('Failed to add todo');
      setValidation(false);

      const timerId: NodeJS.Timeout = setTimeout(
        () => setValidation(true),
        3000
      );
      setValidationTimerId(timerId);
    }
  };
  React.useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'Enter') {
        if (todo.title!.trim().length > 0 && todo.title) {
          dispatch(AddTodoTitle(''));
          dispatch(AddTodoNote(''));
          clearTimout();
          const todo = CreateTodo();
          dispatch(UpdateTodos({ todoList: [...todos.todoList, todo] }));
          handleAddTodo(todo);
        } else {
          setdescription('Title is required');
          setValidation(false);
          clearTimout();

          const timerId: NodeJS.Timeout = setTimeout(
            () => setValidation(true),
            3000
          );
          setValidationTimerId(timerId);
        }
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [todo, todos, dispatch]);
  return (
    <div
      className={
        !theme ? styles.container : `${styles.container} ${styles.darkmode}`
      }
    >
      <label htmlFor="todoInput">
        <p
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Create to do
        </p>
      </label>

      <Validation
        status={
          description !== 'Title is required' &&
          description !== 'Failed to add todo'
        }
        appear={!validation}
        description={description}
      />
      <InputTitle />

      <div className={styles.buttons}>
        <Button open={<AddNote />} description="Add note">
          <NoteIcon />
        </Button>

        <Button
          open={<AddTime />}
          onClick={ToggleTimeHandler}
          description="Add time"
        >
          <TimeIcon />
        </Button>
        <Button
          onClick={() => {
            if (todo.title!.trim().length > 0) {
              dispatch(AddTodoTitle(''));
              dispatch(AddTodoNote(''));
              clearTimout();
              const todo = CreateTodo();
              dispatch(UpdateTodos({ todoList: [...todos.todoList, todo] }));
              handleAddTodo(todo);
            } else {
              setdescription('Title is required');
              setValidation(false);
              clearTimout();

              const timerId: NodeJS.Timeout = setTimeout(
                () => setValidation(true),
                3000
              );
              setValidationTimerId(timerId);
            }
          }}
          description="Add todo"
        >
          <AddToDoIcon />
        </Button>
      </div>
    </div>
  );
};

export default CreateToDo;
