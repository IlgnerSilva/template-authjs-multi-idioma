import { z } from 'zod';
import 'dotenv/config'

const envSchema = z.object({
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	HOST: z.string(),
	DATABASE_URL: z.string(),
	RESEND_API_KEY: z.string(),
	RESEND_FROM_EMAIL: z.string().optional(),
});

if (!envSchema.safeParse(process.env).success)
	throw new Error('Invalid environment variables.');

export const env = envSchema.parse(process.env);
