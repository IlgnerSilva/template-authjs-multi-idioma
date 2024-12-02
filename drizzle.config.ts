import { env } from '@/env'
import { defineConfig } from 'drizzle-kit'

const url = env.DATABASE_URL // Ou outra lógica para definir a URL

if (!url) {
	throw new Error('DATABASE_URL must be defined')
}

export default defineConfig({
	out: './src/db/',
	schema: './src/db/schemas/',
	dialect: 'mysql',
	dbCredentials: {
		url: url,
	},
})
