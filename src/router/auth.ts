import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import type { ErrorResponse } from '@/lib/api-response';
import { CredentialSchema } from '@/schemas/auth';
import { os } from '@orpc/server';

export const signin = os
	.route({
		method: 'POST',
		path: '/authentication/signin',
		summary: 'Signin',
		tags: ['Authentication'],
	})
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
