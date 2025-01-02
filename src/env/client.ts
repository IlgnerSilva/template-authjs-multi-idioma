'use client';

import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	NEXT_PUBLIC_ENABLED_PROVIDERS: z.string(),
});

export default envSchema.parse({
	NEXT_PUBLIC_ENABLED_PROVIDERS: process.env.NEXT_PUBLIC_ENABLED_PROVIDERS,
});
