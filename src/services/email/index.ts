import { env } from '@/env'

import { EmailTemplate } from '@/schemas/email/'
import { Resend } from 'resend'

interface Email {
	email: string
	subject: string
	message: string
	type: 'code' | 'message'
}

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail({ email, message, subject, type }: Email) {
	const { error, data } = await resend.emails.send({
		from: env.RESEND_FROM_EMAIL,
		to: email,
		subject: subject,
		react: EmailTemplate(type, message),
	})

	if (error) {
		throw new Error(error.message)
	}

	return data
}
