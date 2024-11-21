'use server'

import { signIn } from '@/auth'
import { CredentialsSchema } from '@/schemas/auth'
import { findByUserEmail } from '@/services/user'
import { getTranslations } from 'next-intl/server'
import type { z } from 'zod'

export const loginGoogle = async () => await signIn('google')

export async function loginCredentials(
	credentials: z.infer<typeof CredentialsSchema>,
) {
	const validCredentials = await CredentialsSchema.safeParse(credentials)
	const p = await getTranslations('Pages')

	if (!validCredentials.success)
		return { error: true, message: p('Login.messages.error.credentials') }

	try {
		const { email, password, code } = validCredentials.data
		const user = await findByUserEmail(email)
		console.log(user)
		return user
	} catch (erro) {}
}
