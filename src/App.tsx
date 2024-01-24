import React from 'react';
import './App.css';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';

import { useAppDispatch, useAppSelector } from './hooks';
import { initDatabase, Todo } from './DataBase';
import { UpdateTodos } from './Store/TodosSlice';
import HelloWindow from './Components/Content/HelloWindow/HelloWindow';
import NotPhone from './Components/NotPhone/NotPhone';
import VideoComponent from './Components/VideoComponent/VideoComponent';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await initDatabase();
        const transaction = db.transaction(['todos'], 'readonly');
        const store = transaction.objectStore('todos');

        const todos: Todo[] = await new Promise((resolve) => {
          const request = store.getAll();
          request.onsuccess = () => {
            const result = request.result;
            resolve(Array.isArray(result) ? result : []);
          };
          request.onerror = () => resolve([]);
        });

        dispatch(UpdateTodos({ todoList: todos }));
        console.log('DATA BASE INITIALIZED');
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromIndexedDB();
  }, [dispatch]);
  return (
    <div className="App">
      <VideoComponent />
      <div className="blur"></div>
      {localStorage.getItem('hello') === null && <HelloWindow />}
      <NotPhone />
      <Header />
      <Content />
    </div>
  );
}

export default App;
