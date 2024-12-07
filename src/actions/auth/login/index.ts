'use server'

import { signIn } from '@/auth'
import { CredentialsSchema } from '@/schemas/auth'
import { findByUserEmail } from '@/services/user'

import { compare } from 'bcrypt'
import { generateCodeTwoFactorAuthentication, getCodeTwoFactorAuthentication } from '@/services/auth/two-factor-authentication'
import { actionClient } from "@/lib/safe-action"
import { z } from 'zod'

export const loginGoogle = async () => await signIn('google')

export const loginCredentials = actionClient
	.schema(CredentialsSchema)
	.action(async ( { parsedInput: {email, password, code} } ) => {
		const user = await findByUserEmail(email);
		if(!user)
			return {
				erro: true,
				type: "user",
				message: "User is not found."
			}
		if(!await compare(password, user[0].password as string))
			return {
				erro: true,
				type: "user",
				message: "Email or password is invalid."
			}
		
		if(user[0].twoFactorAuthentication){
			if(code){
				if(code === await getCodeTwoFactorAuthentication()){
					const {password, ...userFound} = user[0]
					return await signIn('credentials', userFound)
				}
				
				return {
					erro: true,
					type: "user",
					message: "Invalid code."
				}
			}
			await generateCodeTwoFactorAuthentication()
			await getCodeTwoFactorAuthentication()
			return {
				erro: true,
				type: "twoFactorAuthentication",
				message: "Two factor authentication is required."
			}
		}
	})