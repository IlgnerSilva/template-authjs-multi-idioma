'use server';

import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { ERROR_CODE, generateError, type ErrorResponse } from '@/lib/api-response';
import { signin } from '@/router/auth';
import { CredentialSchema } from '@/schemas/auth';
import { os, onError } from '@orpc/server';
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"

export const loginCredentialsAuthAction = os
	.input(CredentialSchema)
	.handler(async ({ input }) => {
		try {
			const { data, error } = await authClient.signUp.email({
				name: 'Ilgner',
				email: input.email,
				password: input.password,
			})
			console.log(data)
			console.log(error)
			//return data;
			// const response = await auth.api.signInEmail({
			// 	body: {
			// 		email: input.email,
			// 		password: input.password,
			// 		callbackURL: '/'
			// 	},
			// 	asResponse: true
			// })
			// if(!response.ok) throw generateError(ERROR_CODE.INVALID_EMAIL_OR_PASSWORD);
			// return response
			// return await getInjection(
			// 	AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
			// ).execute(input);
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
