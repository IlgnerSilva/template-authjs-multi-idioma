'use server';

import { getInjection } from '@/core/di/container';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { CredentialSchema } from '@/schemas/auth';
import { os } from '@orpc/server';
import { authClient } from '@/lib/auth-client';
import {
	generateError,
	generateSuccess,
	ERROR_CODE,
	SUCCESS_CODE,
} from '@/lib/api-response';

export const loginCredentialsAuthAction = os
	.input(CredentialSchema)
	.handler(async ({ input }) => {
		return await authClient.signIn.email({
			email: input.email,
			password: input.password,
			
		});
	})
	.actionable();