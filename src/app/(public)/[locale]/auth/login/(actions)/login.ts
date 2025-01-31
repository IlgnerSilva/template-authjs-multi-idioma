'use server';

import { signIn } from '@/auth';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import { AuthenticateWithCredentialsUseCase } from '@core/application/use-cases/user/authenticate-with-credentials.use-case';

export const loginGoogle = async () => await signIn('google');
export const loginGithub = async () => await signIn('github');

export const loginCredentials = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string(),
			code: z.optional(z.string()),
		}),
	)
	.handler(async ({ input }) => {
		return await AuthenticateWithCredentialsUseCase.execute(input);
	});
