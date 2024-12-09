// Serviços de autenticação com 2FA

import { createSessionOptions } from '@/lib/session'
import { generateOTP } from '@/lib/utils'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

interface OTP {
	otp: string
}

// Server Action para gerar o código de 2FA
export async function generateCodeTwoFactorAuthentication() {
	const otp = generateOTP(6)

	const cookieStore = cookies()
	const session = await getIronSession<OTP>(
		await cookieStore,
		createSessionOptions('code_otp'),
	)

	// Atribuir OTP à sessão
	session.otp = otp

	// Salvar sessão após modificar
	await session.save()
}

// Server Action para obter o código de 2FA
export async function getCodeTwoFactorAuthentication() {
	const cookieStore = cookies()
	const session = await getIronSession<OTP>(
		await cookieStore,
		createSessionOptions('code_otp'),
	)
	console.log(session.otp)
	return session.otp
}

export async function destroyCodeTwoFactorAuthentication() {
	const cookieStore = cookies()
	const session = await getIronSession<OTP>(
		await cookieStore,
		createSessionOptions('code_otp'),
	)
	console.log('Executei', session)
	session.destroy()
}
