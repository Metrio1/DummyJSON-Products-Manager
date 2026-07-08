import axios, { type AxiosError } from 'axios';

const DUMMYJSON_BASE = 'https://dummyjson.com';

export const axiosInstance = axios.create({
  baseURL: 'https://api.allorigins.win/raw?url=' + encodeURIComponent(DUMMYJSON_BASE),
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message: string;

    if (error.code === 'ECONNABORTED') {
      message = 'Сервер долго не отвечает. Попробуйте ещё раз.';
    } else if (!error.response) {
      message = 'Проблема с подключением к серверу. Проверьте интернет-соединение.';
    } else {
      message = (error.response.data as { message?: string })?.message || error.message;
    }

    throw new Error(message);
  },
);
