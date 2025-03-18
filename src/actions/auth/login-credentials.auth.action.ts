'use server';

import { signIn } from '@/auth';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import { getInjection } from '@core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@core/di/symbols/authentication.symbols';

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
