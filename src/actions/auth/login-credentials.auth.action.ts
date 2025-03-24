'use server';

import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const loginCredentialsAuthAction = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string(),
			code: z.optional(z.string()),
		}),
	)
	.handler(async ({ input }) => {
		return await getInjection(
			AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
		).execute(input);
	});
