import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
	schema: './src/lib/schemas/index.ts',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DB_URL ?? '',
		authToken: process.env.DB_TOKEN
	},
	verbose: true,
	strict: true
});
