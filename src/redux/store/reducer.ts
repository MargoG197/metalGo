import {TASK_ADD, TASK_REMOVE, TASK_TOGGLE } from '../actions/actionTypes'; 
import { TTodoResponse } from '../../api/todoApi';


export default function reducer( state: TTodoResponse[], lastId: number, action: { type: string, payload: TTodoResponse } ) {

  switch (action.type) {
    case TASK_ADD:
      return [...state, {
        id: ++lastId,
        title: action.payload.title,
        completed: false,
      }];
    case TASK_TOGGLE:
      return state.map(task => {
        if (task.id === action.payload.id)
          return { ...task, completed: !task.completed }
        return task;
      });
    case TASK_REMOVE:
      return state.filter(task => action.payload.id !== task.id);
    default:
      return state;
  }
}