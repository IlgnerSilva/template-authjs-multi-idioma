'use server';

import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import type { ErrorResponse } from '@/lib/errors'

export const loginCredentialsAuthAction = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string(),
			code: z.optional(z.string()),
		}),
	)
	.handler(async ({ input }) => {
		try {
			return await getInjection(
				AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
			).execute(input);
		} catch (error) {
			const erro = error as ErrorResponse
			return erro;
		}

		// return await getInjection(
		// 	AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
		// ).execute(input);
	});
