import { TotpSchema } from '@/schemas/auth';
import { ORPCError, os,  } from '@orpc/server';
import { getInjection } from '@/core/di/container';
import { VERIFYTOTP_SIMBOLS } from '@/core/di/symbols/authentication.symbols';

export const verifyTotp = os
	.route({
		method: 'POST',
		path: '/authentication/verify/totp',
		summary: 'Verify TOTP',
		tags: ['Authentication'],
	})
	.input(TotpSchema)
	.handler(async ({ input }) => {
		try {
			return await getInjection(
				VERIFYTOTP_SIMBOLS.VerifyTOTP,
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
