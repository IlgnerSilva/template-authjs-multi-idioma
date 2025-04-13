import { generateError, ERROR_CODE, generateSuccess, SUCCESS_CODE } from '@/lib/api-response';
import { auth } from '@/lib/auth';
import { APIError } from "better-auth/api"
import { CredentialSchema } from '@/schemas/auth';
import { ORPCError, os } from '@orpc/server';


export const signin = os
	.route({
		method: 'POST',
		path: '/authentication/signin',
		summary: 'Signin',
		tags: ['Authentication'],
	})
	.input(CredentialSchema)
	.handler(async ({ input }) => {
		try{
			const response = await auth.api.signInEmail({
				body:{
					email: input.email,
					password: input.password,
					callbackURL: '/'
				},
			})
			return response
		}catch(err){
			if(err instanceof APIError){
				return generateError(ERROR_CODE.INVALID_EMAIL_OR_PASSWORD, {message: err.message, details: err})
			}
		}
	})
	.actionable();
