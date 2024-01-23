export interface Todo {
  id: number;
  completed: boolean;
  date: number;
  title: string;
  note?: string;
}
const dbName = 'plannerDB';
const storeName = 'todos';
export const initDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = () => {
      reject(new Error('Failed to open the database'));
    };
  });
};
export const addTodo = async (todo: Todo): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await initDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(todo);

      request.onsuccess = () => {
        console.log('TODO ADDED');

        resolve();
      };

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        const errorMessage = error
          ? error.message || 'Unknown error'
          : 'Unknown error';
        console.error('Failed to add todo to the database:', errorMessage);
        reject(new Error('Failed to add todo to the database'));
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const removeTodo = async (todoId: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await initDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(todoId);

      request.onsuccess = () => {
        console.log('TODO REMOVED');
        resolve();
      };

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        const errorMessage = error
          ? error.message || 'Unknown error'
          : 'Unknown error';
        console.error('Failed to remove todo from the database:', errorMessage);
        reject(new Error('Failed to remove todo from the database'));
      };
    } catch (error) {
      reject(error);
    }
  });
};
export const toggleTodoCompleted = async (todoId: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await initDatabase();
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(todoId);

      getRequest.onsuccess = () => {
        const todoToUpdate = getRequest.result as Todo;
        if (todoToUpdate) {
          todoToUpdate.completed = !todoToUpdate.completed;

          const updateRequest = store.put(todoToUpdate);
          updateRequest.onsuccess = () => {
            console.log('TODO COMPLETED TOGGLED');
            resolve();
          };
          updateRequest.onerror = (event) => {
            const error = (event.target as IDBRequest).error;
            const errorMessage = error
              ? error.message || 'Unknown error'
              : 'Unknown error';
            console.error(
              'Failed to toggle todo completed status:',
              errorMessage
            );
            reject(new Error('Failed to toggle todo completed status'));
          };
        } else {
          console.error(`Todo with id ${todoId} not found`);
          reject(new Error(`Todo with id ${todoId} not found`));
        }
      };

      getRequest.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        const errorMessage = error
          ? error.message || 'Unknown error'
          : 'Unknown error';
        console.error('Failed to get todo from the database:', errorMessage);
        reject(new Error('Failed to get todo from the database'));
      };
    } catch (error) {
      reject(error);
    }
  });
};
