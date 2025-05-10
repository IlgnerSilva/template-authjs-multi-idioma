import { getInjection } from '@/core/di/container';
import { SIGNINEMAILANDPASSWORD_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { SigninEmailAndPasswordSchema } from '@/schemas/auth';
import { os, ORPCError } from '@orpc/server';

export const signin = os
	.route({
		method: 'POST',
		path: '/authentication/signin',
		summary: 'Signin',
		tags: ['Authentication'],
	})
	.input(SigninEmailAndPasswordSchema)
	.handler(async ({ input }) => {
		try {
			return await getInjection(
				SIGNINEMAILANDPASSWORD_SYMBOLS.SigninEmailAndPasswordUseCase,
			).execute(input);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			throw new ORPCError(err.status, {
				data: err.body,
				message: err.message,
				status: err.statusCode,
			});
		}
	})
	.actionable();
