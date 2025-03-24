import { signIn } from '@/auth';
import { MFACode } from '@/components/shared/emails/templates/mfaCode';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { OtpCodes } from '@/core/domain/entities/otp-codes.entity';
import type { IOtpCodes } from '@/core/domain/repositories/otp.repository.interface';
import type { IUserOrganizationRepository } from '@/core/domain/repositories/user-organization.interface';
import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import type { IEmailService } from '@/core/domain/services/email.service.interface';
import type { IPassword } from '@/core/domain/services/password.interface';
import { ERROR_TYPES, generateError } from '@/lib/errors';
import { generateOTP } from '@/lib/utils';
import { inject, injectable } from 'inversify';

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

		@inject(AUTHENTICATION_SYMBOLS.IOtpCodes)
		private otpCodesRepository: IOtpCodes,

		@inject(AUTHENTICATION_SYMBOLS.IPassword)
		private passwordHasher: IPassword,

		@inject(AUTHENTICATION_SYMBOLS.IEmailService)
		private emailService: IEmailService,
	) {}
	async execute({
		email,
		password,
		code,
	}: AuthenticateWithCredentialsUseCaseRequest) {
		const [user] = (await this.usersRepository.findByEmail(email)) ?? [];

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
				const [codes] =
					(await this.otpCodesRepository.findOtpByUserId(user.user_id)) ?? [];
				if (code === codes.code)
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
			const genrateOtp = await generateOTP(6);
			await this.emailService.sendEmail({
				to: ['ilgnersilva@outlook.com'],
				subject: '[Template]: Código de autenticação',
				react: MFACode({ code: genrateOtp }),
			});
			const otp = new OtpCodes({
				code: genrateOtp,
				user_id: user.user_id,
				active: true,
			});
			await this.otpCodesRepository.insert(otp);
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
