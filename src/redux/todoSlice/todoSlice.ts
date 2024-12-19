import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTodoResponse } from '../../api/todoApi';

const initialState = [] as TTodoResponse[];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    presetInitialTodos: (_, action: PayloadAction<TTodoResponse[]>) => {
     return [...action.payload]
    },
    setTodoStatus: (state, action: PayloadAction<{ id: number, completed: boolean }>) => {
      const index = state.findIndex((todo) => todo.id == action.payload.id);
      state[index].completed = action.payload.completed;
    },
    addTodo:(state, action: PayloadAction<TTodoResponse>) => {
       return [...state, action.payload]
      },
    removeTodo: (state, action: PayloadAction<TTodoResponse>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state.splice(index, 1);
    },
  }, 
});

export const { addTodo, removeTodo, setTodoStatus, presetInitialTodos } = todoSlice.actions;
export default todoSlice.reducer;
