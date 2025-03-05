import { z } from 'zod';

export const CredentialsSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		code: z.optional(z.string()),
	})
	.required();
