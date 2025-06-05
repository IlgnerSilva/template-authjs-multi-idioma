import { getInjection } from '@/core/di/container';
import { GETSESSIONAUTH_SIMBOLS } from '@/core/di/symbols/authentication.symbols';
import { os, ORPCError } from '@orpc/server';

export const getSession = os
	.route({
		method: 'GET',
		path: '/authentication/session',
		summary: 'Get session',
		tags: ['Authentication'],
	})
	.handler(async () => {
		try {
			const session = await getInjection(
				GETSESSIONAUTH_SIMBOLS.GetSessionAuthUseCase,
			).execute();
			if(!session){
				throw new Error('Session not found')
			}
			return session;
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
