import { init, retrieveLaunchParams } from '@telegram-apps/sdk-react';

export const envConfig = {
  telegramAuth: '',
  apiUrl: String(import.meta.env.VITE_API_URL),
};

try {
  init();
  const { initDataRaw } = retrieveLaunchParams();
  const telegramAuth = initDataRaw || '';
  envConfig.telegramAuth = telegramAuth;
  console.log(initDataRaw);
} catch (err) {
  console.error(err);
}
