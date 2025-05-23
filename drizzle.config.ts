import { env } from './src/env';
import { defineConfig } from 'drizzle-kit';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL must be defined');
}

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schemas.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
