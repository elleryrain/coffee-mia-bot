import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  botToken: process.env.BOT_TOKEN,
  imageCaption: 'MIA_COFFEE_BOT',
  appLink: process.env.APP_LINK || 'https://192.168.0.4:4200',
};
console.log(envConfig);
