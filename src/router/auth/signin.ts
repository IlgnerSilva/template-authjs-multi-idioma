import { CredentialSchema } from '@/schemas/auth';
import { ORPCError, os,  } from '@orpc/server';
import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';

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
				AUTHENTICATION_SYMBOLS.SigninEmailAndPasswordUseCase,
			).execute(input);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			return new ORPCError(err.status, {
				data: err.body,
				message: err.message,
				status: err.statusCode,
			});
		}
	}).actionable()
