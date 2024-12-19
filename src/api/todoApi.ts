
import axios, { AxiosResponse } from 'axios';

//const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_URL = 'https://jsonplaceholder.typicode.com/';
const todoEndpoint = `${API_URL}todos`;


type TTodoResponse = {
  userId?: number
  id: number
  title: string
  completed: boolean
}


// Получение всех todo
export const getAllTodos = async (id:number): Promise<TTodoResponse> => {
    try {
      const response: AxiosResponse<TTodoResponse> = await axios({
        url: `${todoEndpoint}/${id}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      console.error( 'Get requestgetAllTodos has failed', err)
      throw err; // Пробрасываем ошибку
    }
};

  
export {type TTodoResponse}