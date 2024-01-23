import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './Store';
import { toggleTheme } from './Store/themeSlice';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const storedTheme = localStorage.getItem('theme');
if (storedTheme !== null) {
  store.dispatch(toggleTheme(storedTheme !== 'true'));
}
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
