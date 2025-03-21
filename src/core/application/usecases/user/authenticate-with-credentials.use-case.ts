import type { IUserOrganizationRepository } from '@/core/domain/repositories/user-organization.interface';
import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import type { IPassword } from '@/core/domain/services/password.interface';
import { signIn } from '@/auth';
import { ERROR_TYPES, generateError } from '@/lib/errors';
import { inject, injectable } from 'inversify';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';

interface AuthenticateWithCredentialsUseCaseRequest {
	email: string;
	password: string;
	code?: string;
}

@injectable()
export class AuthenticateWithCredentialsUseCase {
	constructor(
		@inject(AUTHENTICATION_SYMBOLS.IUserRepository)
		private usersRepository: IUserRepository,

		@inject(AUTHENTICATION_SYMBOLS.IUserOrganizationRepository)
		private userOrganizarionRepository: IUserOrganizationRepository,

		@inject(AUTHENTICATION_SYMBOLS.IPassword)
		private passwordHasher: IPassword,
	) {}
	async execute({
		email,
		password,
		code,
	}: AuthenticateWithCredentialsUseCaseRequest) {
		const [user] = await this.usersRepository.findByEmail(email);

		if (!user) throw generateError(ERROR_TYPES.USER_NOT_FOUND);

		if (
			user.password_hash &&
			!(await this.passwordHasher.comparePasswords(
				password,
				user.password_hash,
			))
		)
			return generateError(ERROR_TYPES.INVALID_EMAIL_OR_PASSWORD);

		const userOrganizations =
			await this.userOrganizarionRepository.findOrganizationsByUserId(
				user.user_id,
			);
		if (user.two_factor_authentication) {
			if (code) {
				// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
				if (code == '123456')
					return await signIn('credentials', {
						user_id: user.user_id,
						name: user.name,
						email: user.email,
						provider: user.provider,
						picture: user.image,
						organizations:
							userOrganizations.length > 0 ? userOrganizations : undefined,
					});
				return generateError(ERROR_TYPES.INVALID_CODE);
			}

			return generateError(ERROR_TYPES.TWO_FACTOR_REQUIRED);
		}

		return await signIn('credentials', {
			user_id: user.user_id,
			name: user.name,
			email: user.email,
			provider: user.provider,
			picture: user.image,
			organizations:
				userOrganizations.length > 0 ? userOrganizations : undefined,
		});
	}
}
