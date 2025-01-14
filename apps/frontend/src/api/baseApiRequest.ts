import axios from 'axios';
import { envConfig } from '../config/config';

interface BaseApiRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  signal?: AbortSignal;
  params?: string[][] | Record<string, string> | string | URLSearchParams;
  headers?: Record<string, string>;
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  signal,
  params,
  headers,
}: BaseApiRequestOptions): Promise<T> => {
  const urlParams = new URLSearchParams(params);

  const allHeaders: { [key: string]: string } = {
    ...headers,
    'X-Telegram-Auth': `tma ${envConfig.telegramAuth}`,
    'ngrok-skip-browser-warning': 'true',
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
