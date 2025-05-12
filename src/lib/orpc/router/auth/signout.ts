import { getInjection } from '@/core/di/container';
import { SIGNOUT_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { os, ORPCError } from '@orpc/server';

export const signout = os
	.route({
		method: 'POST',
		path: '/authentication/signout',
		summary: 'Signout',
		tags: ['Authentication'],
	})
	.handler(async () => {
		try {
			return await getInjection(SIGNOUT_SYMBOLS.SignoutUseCase).execute();
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
