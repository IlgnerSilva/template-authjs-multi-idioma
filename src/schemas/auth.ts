import { z } from 'zod';

export const SigninEmailAndPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const TotpSchema = z.object({
	code: z.string().min(6).max(6),
});

export const TokenSchema = z.object({
	token: z.string(),
});
