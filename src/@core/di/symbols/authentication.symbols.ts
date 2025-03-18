import { createSymbol } from '@core/di/utils/createSymbols.util';
import type { IUserRepository } from '@core/infra/repositories/drizzle/user/user.repository.interface';
import type { IUserOrganizationRepository } from '@core/infra/repositories/drizzle/user-organizations/user-organization.interface';
import type { IPassword } from '@core/security/password/password.interface';
import type { AuthenticateWithCredentialsUseCase } from '@core/application/use-cases/user/authenticate-with-credentials.use-case';

export const AUTHENTICATION_SYMBOLS = {
	IUserRepository: createSymbol<IUserRepository>('IUserRepository'),
	IUserOrganizationRepository: createSymbol<IUserOrganizationRepository>(
		'IUserOrganizationRepository',
	),
	IPassword: createSymbol<IPassword>('IPassword'),
	AuthenticateWithCredentialsUseCase:
		createSymbol<AuthenticateWithCredentialsUseCase>(
			'AuthenticateWithCredentialsUseCase',
		),
} as const;
