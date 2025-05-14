import { store } from 'app/providers/storeProvider/config/store';
import axios from 'axios';


export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Проверяем 401 ошибку и что запрос ещё не повторялся
    if (error.response?.status === 401 && originalRequest && !originalRequest._retryCount) {
      originalRequest._retryCount = 0;
      const maxRetries = 2;
      
      // Функция для повторного выполнения запроса
      const retryRequest = async (): Promise<any> => {
        try {
          originalRequest._retryCount! += 1;
          
          // Добавляем задержку между повторами (1000ms, 2000ms)
          await new Promise(resolve => 
            setTimeout(resolve, 1000 * originalRequest._retryCount!));
          
          return await api(originalRequest);
        } catch (err) {
          if (originalRequest._retryCount! < maxRetries) {
            return retryRequest();
          }
          throw err;
        }
      };
      
      try {
        return await retryRequest();
      } catch (finalError) {
        // Если после всех повторов всё равно 401 - диспатчим экшен
        if ((finalError).response?.status === 401) {
          store.dispatch({ type: 'USER_UNAUTHORIZED' }); // Ваш экшен
        }
        throw finalError;
      }
    }
    
    return Promise.reject(error);
  }
);