import type { AuthenticateWithCredentialsUseCase } from '@/core/application/usecases/user/authenticate-with-credentials.use-case';
import { createSymbol } from '@/core/di/utils/createSymbols.util';
import type { IOtpCodes } from '@/core/domain/repositories/otp.repository.interface';
import type { IUserOrganizationRepository } from '@/core/domain/repositories/user-organization.interface';
import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import type { IEmailService } from '@/core/domain/services/email.service.interface';
import type { IPassword } from '@/core/domain/services/password.interface';

export const AUTHENTICATION_SYMBOLS = {
	IUserRepository: createSymbol<IUserRepository>('IUserRepository'),
	IUserOrganizationRepository: createSymbol<IUserOrganizationRepository>(
		'IUserOrganizationRepository',
	),
	IOtpCodes: createSymbol<IOtpCodes>('IOtpCodes'),
	IEmailService: createSymbol<IEmailService>('IEmailService'),
	IPassword: createSymbol<IPassword>('IPassword'),
	AuthenticateWithCredentialsUseCase:
		createSymbol<AuthenticateWithCredentialsUseCase>(
			'AuthenticateWithCredentialsUseCase',
		),
} as const;
