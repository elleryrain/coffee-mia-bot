import dotenv from 'dotenv';

dotenv.config();

export const BOT_CONFIG = {
  botToken: String(process.env.BOT_TOKEN),
  port: String(process.env.BOT_HTTP_PORT),
};
