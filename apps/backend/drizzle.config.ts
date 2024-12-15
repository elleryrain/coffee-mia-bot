import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'node:path';
const backendPath = __dirname;
console.log(path.join(__dirname, '../../.env'));
config({
  path: path.join(__dirname, '../../.env'),
  override: true,
});

const drizzleDir = path.join(__dirname, 'src/', 'drizzle/');
const drizzleSchemasDir = path.join(drizzleDir, 'schemas/');
const drizzleSchemaPath = path.join(drizzleSchemasDir, 'schema.ts');
const drizzleMigrationsDir = path.join(drizzleDir, 'migrations/');
console.log(drizzleMigrationsDir);
console.log(String(process.env.DATABASE_URL));
export default defineConfig({
  out: drizzleMigrationsDir,
  schema: drizzleSchemaPath,
  dialect: 'postgresql',
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
});
