import {TASK_ADD, TASK_REMOVE, TASK_TOGGLE} from './actionTypes';
import { TTodoResponse } from '../../api/todoApi';

export const addTask = (task:TTodoResponse) => ({
  type: TASK_ADD,
  payload: task
});

export const toggleTask = (task:TTodoResponse) => ({
  type: TASK_TOGGLE,
  payload: task
});

export const removeTask = (task:TTodoResponse) => ({
  type: TASK_REMOVE,
  payload: task
})