 import { configureStore } from '@reduxjs/toolkit';
import { TTodoResponse } from '../../api/todoApi';
import reducer from "./reducer";

type TReducer = (state: TTodoResponse[], lastId: number, action: { type: string; payload: TTodoResponse }) => { id: number; title: string; completed: boolean }

const store = configureStore<TReducer>({
    reducer: reducer,
});

export default store;

