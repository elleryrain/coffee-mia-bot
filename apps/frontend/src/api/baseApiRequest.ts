import axios from 'axios';
import { envConfig } from '../config/config';

interface BaseApiRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  params?: string[][] | Record<string, string> | string | URLSearchParams;
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  headers,
  signal,
  params,
}: BaseApiRequestOptions): Promise<T> => {
  const urlParams = new URLSearchParams(params);

  const allHeaders: { [key: string]: string } = {
    ...headers,
    'X-Telegram-Auth': envConfig.telegramAuth,
  };

  const apiUrl = `${envConfig.apiUrl}${url}`;
  const response = await axios({
    method,
    url: apiUrl,
    params: urlParams,
    data,
    signal,
    headers: allHeaders,
  });

  return response.data;
};
