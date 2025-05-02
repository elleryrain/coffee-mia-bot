import { config } from 'dotenv';

config();

export const BOT_CONFIG = {
  botToken: process.env.ADMIN_BOT_TOKEN,
  port: process.env.ADMIN_BOT_HTTP_PORT,
};
