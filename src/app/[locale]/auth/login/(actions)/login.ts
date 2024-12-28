'use server'

import { signIn } from '@/auth'
import type { CredentialsSchema } from '@/lib/schemas/auth'
import { findByUserEmail } from '@/services/user'

import {
	destroyCodeTwoFactorAuthentication,
	generateCodeTwoFactorAuthentication,
	getCodeTwoFactorAuthentication,
} from '@/services/auth/two-factor-authentication'
import { sendEmail } from '@/services/email'
import { compare } from 'bcrypt'
import type { z } from 'zod'

export const loginGoogle = async () => await signIn('google')

export async function loginCredentials(
	authCredentials: z.infer<typeof CredentialsSchema>,
) {
	const user = await findByUserEmail(authCredentials.email)
	if (!user)
		return {
			erro: true,
			type: 'user',
			message: 'User is not found.',
		}

	const { password, ...userFound } = user[0]

	if (!(await compare(authCredentials.password, user[0].password as string)))
		return {
			erro: true,
			type: 'user',
			message: 'Email or password is invalid.',
		}

	if (user[0].twoFactorAuthentication) {
		if (authCredentials.code) {
			if (authCredentials.code === (await getCodeTwoFactorAuthentication())) {
				await destroyCodeTwoFactorAuthentication()

				return await signIn('credentials', userFound)
			}

			return {
				erro: true,
				type: 'user',
				message: 'Invalid code.',
			}
		}
		await generateCodeTwoFactorAuthentication()
		await sendEmail({
			email: authCredentials.email,
			subject: 'Two factor authentication',
			message: (await getCodeTwoFactorAuthentication()) as string,
			type: 'code',
		})

		return {
			erro: true,
			type: 'twoFactorAuthentication',
			message: 'Two factor authentication is required.',
		}
	}

	return await signIn('credentials', userFound)
}
