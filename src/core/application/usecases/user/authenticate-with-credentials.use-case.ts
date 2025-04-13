import { authClient } from '@/lib/auth-client';
import { ORPCError } from '@orpc/server';
import { inject, injectable } from 'inversify';

interface AuthenticateWithCredentialsUseCaseRequest {
	email: string;
	password: string;
	code?: string;
}

@injectable()
export class AuthenticateWithCredentialsUseCase {

	async execute({
		email,
		password,
	}: AuthenticateWithCredentialsUseCaseRequest) {
		const {data, error} = await authClient.signIn.email({
			email,
			password,
			callbackURL: '/'
		})
		if(error){
			throw new ORPCError('UNAUTHORIZED')
		}
		return data
	}
}
