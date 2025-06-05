import { z } from 'zod';

export const signinEmailAndPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const totpSchema = z.object({
	code: z.string().min(6).max(6),
});

export const tokenSchema = z.object({
	token: z.string(),
});
