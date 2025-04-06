import { z } from 'zod';

export const CredentialSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	code: z.optional(z.string()),
});

export const TokenSchema = z.object({
	token: z.string(),
});
