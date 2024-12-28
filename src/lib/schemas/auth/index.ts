import { z } from 'zod'
import { useTranslations } from 'next-intl'
const c = useTranslations('Pages.Login.messages.error')

export const CredentialsSchema = z.object({
	email: z.string().email(c('email')),
	password: z.string().min(6, c('password')),
	code: z.optional(z.string()),
})
