import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface BaseApiRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  signal?: AbortSignal;
  params?: string[][] | Record<string, string> | string | URLSearchParams;
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  signal,
  params,
}: BaseApiRequestOptions): Promise<T> => {
  const urlParams = new URLSearchParams(params);

  const apiUrl = `https://dev.do-coffee.ru${url}`;
  const response = await axios({
    method,
    url: apiUrl,
    params: urlParams,
    data,
    signal,
  });

  return response.data;
};
