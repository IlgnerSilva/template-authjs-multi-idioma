import { ContainerModule, type interfaces } from 'inversify';
import { AUTHENTICATION_SYMBOLS } from '../symbols/authentication.symbols';

import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import { UsersDrizzleRepository } from '@/core/infra/repositories/drizzle/user/users.drizzle.repository';

import type { IEmailService } from '@/core/domain/services/email.service.interface';
import { EmailService } from '@/core/infra/services/mail/email.resend.service';

import type { IPassword } from '@/core/domain/services/password.interface';
import { PasswordBcryptRepository } from '@/core/infra/services/password/password.bcrypt.repository';

import { AuthenticateWithCredentialsUseCase } from '@/core/application/usecases/user/authenticate-with-credentials.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<IUserRepository>(AUTHENTICATION_SYMBOLS.IUserRepository).to(
		UsersDrizzleRepository,
	);
	
	bind<IEmailService>(AUTHENTICATION_SYMBOLS.IEmailService).to(EmailService);

	bind<IPassword>(AUTHENTICATION_SYMBOLS.IPassword).to(
		PasswordBcryptRepository,
	);
	bind<AuthenticateWithCredentialsUseCase>(
		AUTHENTICATION_SYMBOLS.AuthenticateWithCredentialsUseCase,
	).to(AuthenticateWithCredentialsUseCase);
};

export const AuthenticationModule = new ContainerModule(initializeModule);
