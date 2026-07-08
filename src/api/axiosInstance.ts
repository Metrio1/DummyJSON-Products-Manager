import axios, { type AxiosError } from 'axios';

export const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';

export const fakeStoreAxios = axios.create({
  baseURL: FAKESTORE_BASE_URL,
  timeout: 8000,
});

export const localDataAxios = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
});

const handleAxiosError = (error: AxiosError): never => {
  let message: string;

  if (error.code === 'ECONNABORTED') {
    message = 'Сервер долго не отвечает. Попробуйте ещё раз.';
  } else if (!error.response) {
    message = 'Проблема с подключением к серверу. Проверьте интернет-соединение.';
  } else {
    message = (error.response.data as { message?: string })?.message || error.message;
  }

  throw new Error(message);
};

fakeStoreAxios.interceptors.response.use((response) => response, handleAxiosError);
localDataAxios.interceptors.response.use((response) => response, handleAxiosError);

/** @deprecated Use fakeStoreAxios or localDataAxios directly */
export const axiosInstance = fakeStoreAxios;
