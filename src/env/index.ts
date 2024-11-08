import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_DRIZZLE_URL: z.string(),
	DATABASE_AUTH_TOKEN: z.string(),
})

if (!envSchema.safeParse(process.env).success)
	throw new Error('Invalid environment variables.')

export const env = envSchema.parse(process.env)
