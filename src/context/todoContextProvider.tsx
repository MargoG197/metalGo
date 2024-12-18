import React, { useState, useEffect } from 'react';
import { TTodoResponse, getAllTodos } from '../api/todoApi';
import mockArr from "../api/Mock";
import { TodoContext } from './todoContext';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [todos, setTodos] = useState<TTodoResponse[]>(mockArr);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
  
  async function requestEachTodo() {
    const idArr: number[] = [...Array(20).keys()];
    const todosArr: TTodoResponse[] = [];
    setIsLoading(true);
    setError(null);
    Promise.allSettled(
      idArr.map((id) => {
        return getAllTodos(id + 1);
      })
    )
      .then((responses) =>
        responses.forEach((result, num) => {
          if (result.status == "fulfilled") {
            todosArr.push(result.value);
          }
          if (result.status == "rejected") {
            console.log(`${num} todo was not fetched`);
          }
        })
      )
      .finally(() => {
        if (todosArr.length > 0) {
          setTodos(todosArr);
        }
        setIsLoading(false);

      });
  };
  
  useEffect(() => {
    requestEachTodo();
  }, []);

  
  return (
    <TodoContext.Provider value={{ todos, isLoading, error}}>
      {children}
    </TodoContext.Provider>
  )
};
