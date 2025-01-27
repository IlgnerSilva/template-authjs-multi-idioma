import type { IPasswordHasherRepository } from '@core/domain/repositories/password-hasher.repository.interface';
import type { IUserRepository } from '@core/domain/repositories/user.repository.interface';
import type { AuthenticateWithCredentialsUseCase } from '@core/application/use-cases/user/authenticate-with-credentials.use-case';

export const DI_SYMBOLS = {
	IUserRepository: Symbol.for('IUserRepository'),
	IPasswordHasherRepository: Symbol.for('IPasswordHasherRepository'),

	AuthenticateWithCredentialsUseCase: Symbol.for(
		'AuthenticateWithCredentialsUseCase',
	),
};

export interface DI_RETURN_TYPES {
	IUserRepository: IUserRepository;
	IPasswordHasherRepository: IPasswordHasherRepository;

	AuthenticateWithCredentialsUseCase: AuthenticateWithCredentialsUseCase;
}
