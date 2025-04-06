'use server';

import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import type { ErrorResponse } from '@/lib/errors';
import { signin } from '@/router/auth';
import { CredentialSchema } from '@/schemas/auth';
import { os, onError } from '@orpc/server';

export const loginCredentialsAuthAction = os
	.input(CredentialSchema)
	.handler(async ({ input }) => {
		try {
			return await getInjection(
				AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
			).execute(input);
		} catch (error) {
			const erro = error as ErrorResponse;
			return erro;
		}
	})
	.actionable();

// export const loginCredentialsAuthActions = createServerAction()
// 	.input(
// 		z.object({
// 			email: z.string().email(),
// 			password: z.string(),
// 			code: z.optional(z.string()),
// 		}),
// 	)
// 	.handler(async ({ input }) => {
// 		try {
// 			return await getInjection(
// 				AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
// 			).execute(input);
// 		} catch (error) {
// 			const erro = error as ErrorResponse;
// 			return erro;
// 		}

// 		// return await getInjection(
// 		// 	AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
// 		// ).execute(input);
// 	});
