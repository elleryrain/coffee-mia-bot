import { config } from 'dotenv';
import path from 'node:path';
import { z } from 'zod';

const envPath = path.join(__dirname, '../../../', '.env');
console.log(envPath);
const env = config({
  path: envPath,
});

const configValidator = z.object({
  BACKEND_PORT: z.string(),
  DATABASE_URL: z.string(),
  S3_ENDPOINT: z.string(),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_REGION: z.string(),
  BOT_TOKEN: z.string(),
});

const parsedConfig = configValidator.safeParse(env.parsed);

if (!parsedConfig.success) {
  console.log(parsedConfig.error);
  process.exit(1);
}
const dataConfig = parsedConfig.data;

export const backendPort = Number(dataConfig.BACKEND_PORT);
export const databaseUrl = dataConfig.DATABASE_URL;
export const s3Endpoint = dataConfig.S3_ENDPOINT;
export const s3Bucket = dataConfig.S3_BUCKET;
export const s3AccessKey = dataConfig.S3_ACCESS_KEY;
export const s3SecretKey = dataConfig.S3_SECRET_KEY;
export const s3Region = dataConfig.S3_REGION;
export const botToken = dataConfig.BOT_TOKEN;
