'use server'

import { signIn } from '@/auth'
import { CredentialsSchema } from '@/schemas/auth'
import { findByUserEmail } from '@/services/user'
import type { z } from 'zod'

export const loginGoogle = async () => await signIn('google')

export async function loginCredentials(
	credentials: z.infer<typeof CredentialsSchema>,
) {
	const validCredentials = await CredentialsSchema.safeParse(credentials)

	if (!validCredentials.success) return { error: true, message: 'Invalid data' }

	try {
		const { email, password, code } = validCredentials.data
		const user = await findByUserEmail(email)
		console.log(user)
		return user
	} catch (erro) {}
}
