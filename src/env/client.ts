'use client';

import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	NEXT_PUBLIC_ENABLED_PROVIDERS: z.string().optional(),
});

if (!envSchema.safeParse(process.env).success)
	throw new Error('Invalid environment variables.');

export const env = envSchema.parse(process.env);
