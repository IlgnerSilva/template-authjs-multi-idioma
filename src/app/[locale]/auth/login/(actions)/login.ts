'use server';

import { signIn } from '@/auth';
import { ERROR_TYPES, createError } from '@/lib/errors';
import { CredentialsSchema } from '@/lib/schemas/auth';
import {
	destroyCodeTwoFactorAuthentication,
	generateCodeTwoFactorAuthentication,
	getCodeTwoFactorAuthentication,
} from '@/services/auth/two-factor-authentication';
import { sendEmail } from '@/services/email';
import { findByUserEmail, insertUser } from '@/services/user';
import { compare, hash } from 'bcrypt';
import { createServerAction } from 'zsa';

export const loginGoogle = async () => await signIn('google');
export const loginGithub = async () => await signIn('github');

export const loginCredentials = createServerAction()
	.input(CredentialsSchema)
	.handler(async ({ input }) => {
		const user = await findByUserEmail(input.email);
		if (!user[0]) {
			return createError(ERROR_TYPES.USER_NOT_FOUND);
		}

		const { password_hash, ...userFound } = user[0];

		if (!(await compare(input.password, user[0].password_hash as string)))
			return createError(ERROR_TYPES.INVALID_EMAIL_OR_PASSWORD);

		if (user[0].two_factor_authentication) {
			if (input.code) {
				if (input.code === (await getCodeTwoFactorAuthentication())) {
					await destroyCodeTwoFactorAuthentication();

					return await signIn('credentials', userFound);
				}

				return createError(ERROR_TYPES.INVALID_CODE);
			}
			await generateCodeTwoFactorAuthentication();
			// await sendEmail({
			// 	email: input.email,
			// 	subject: 'Two factor authentication',
			// 	message: (await getCodeTwoFactorAuthentication()) as string,
			// 	type: 'code',
			// });

			return createError(ERROR_TYPES.TWO_FACTOR_REQUIRED);
		}

		return await signIn('credentials', userFound);
	});
