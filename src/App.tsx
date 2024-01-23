import React from 'react';
import './App.css';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import LightVideo from './videos/Video1BG.mp4';
import DarkVideo from './videos/vecteezy_gradiente-de-cor-movendo-o-fundo-na-tela_7704135.mp4';
import { useAppDispatch, useAppSelector } from './hooks';
import { initDatabase, Todo } from './DataBase';
import { UpdateTodos } from './Store/TodosSlice';
import HelloWindow from './Components/Content/HelloWindow/HelloWindow';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

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
      <video
        src={DarkVideo}
        autoPlay
        muted
        loop
        className={theme ? 'DarkVideo ' : 'DarkVideo Transperent '}
      />
      <video
        src={LightVideo}
        autoPlay
        muted
        loop
        className={!theme ? 'LightVideo ' : 'LightVideo Transperent '}
      />
      <div className="blur"></div>
      {localStorage.getItem('hello') === null && <HelloWindow />}
      <Header />
      <Content />
    </div>
  );
}

export default App;
