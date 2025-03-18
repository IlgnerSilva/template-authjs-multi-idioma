import { env } from '@/env/server';
import { defineConfig } from 'drizzle-kit';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL must be defined');
}

export default defineConfig({
	out: './drizzle',
	schema: './drizzle/schemas/',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
