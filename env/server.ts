import { z } from 'zod';
// import 'dotenv/config';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_GOOGLE_ID: z.string().optional(),
	AUTH_GOOGLE_SECRET: z.string().optional(),
	RESEND_API_KEY: z.string().optional(),
	RESEND_FROM_EMAIL: z.string().optional(),
	AUTH_TRUST_HOST: z.string().optional(),
});
if (!envSchema.safeParse(process.env).success)
	throw new Error('Invalid environment variables.');

export const env = envSchema.parse(process.env);
