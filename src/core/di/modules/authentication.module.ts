import { ContainerModule, type interfaces } from 'inversify';
import { AUTHENTICATION_SYMBOLS } from '../symbols/authentication.symbols';

import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import { UsersDrizzleRepository } from '@/core/infra/repositories/drizzle/user/users.drizzle.repository';

import type { IUserOrganizationRepository } from '@/core/domain/repositories/user-organization.interface';
import { UserOrganizationDrizzleRepository } from '@/core/infra/repositories/drizzle/user-organizations/user-organization.drizzle.repository';

import { PasswordBcryptRepository } from '@/core/infra/services/password/password.bcrypt.repository';
import type { IPassword } from '@/core/domain/services/password.interface';

import { AuthenticateWithCredentialsUseCase } from '@/core/application/usecases/user/authenticate-with-credentials.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<IUserRepository>(AUTHENTICATION_SYMBOLS.IUserRepository).to(
		UsersDrizzleRepository,
	);
	bind<IUserOrganizationRepository>(
		AUTHENTICATION_SYMBOLS.IUserOrganizationRepository,
	).to(UserOrganizationDrizzleRepository);

	bind<IPassword>(AUTHENTICATION_SYMBOLS.IPassword).to(
		PasswordBcryptRepository,
	);
	bind<AuthenticateWithCredentialsUseCase>(
		AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
	).to(AuthenticateWithCredentialsUseCase);
};

export const AuthenticationModule = new ContainerModule(initializeModule);
