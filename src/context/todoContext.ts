import { createContext } from 'react';
import { TTodoResponse } from '../api/todoApi';
import mockArr from "../api/Mock";

interface ITodoContext{
  todos: TTodoResponse[]
  isLoading: boolean
  error: string | null
}

const defaultTodoContext: ITodoContext = {
  todos: mockArr,
  isLoading: true,
  error: null,
};

// Создаем сам контекст
export const TodoContext = createContext<ITodoContext>(defaultTodoContext);