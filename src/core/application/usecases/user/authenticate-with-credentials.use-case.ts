import { signIn } from '@/auth';
import { MFACode } from '@/components/shared/emails/templates/mfaCode';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { OtpCodes } from '@/core/domain/entities/otp-codes.entity';
import type { User } from '@/core/domain/entities/user.entity';
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
		// Encontrar usuário
		const [user] = (await this.usersRepository.findByEmail(email)) ?? [];
		console.log(!user);
		if (!user) throw generateError(ERROR_TYPES.USER_NOT_FOUND);
		
		// Verificar senha
		if (!user.password_hash || !(await this.passwordHasher.comparePasswords(password, user.password_hash)))
			return generateError(ERROR_TYPES.INVALID_EMAIL_OR_PASSWORD);

		//Verifica se o usuário está bloqueado
		if(user.mfa_locked_until && new Date() < user.mfa_locked_until)
			return generateError(ERROR_TYPES.MFA_LOCKED)

		// Buscar organizações do usuário
		const userOrganizations =
			await this.userOrganizarionRepository.findOrganizationsByUserId(
				user.user_id,
			);

		// Se mfa estiver desativado, loga direto
		if(!user.two_factor_authentication){
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

		// Se usuário não tiver enviado otp na autenticação
		if(!code){
			const otpCode = generateOTP(6)
    		const otpHash = await this.passwordHasher.hashPassword(otpCode)
    		const expiresAt = new Date(Date.now() + 5 * 60000); 

			const otp = new OtpCodes({
				user_id: user.user_id,
				code_hash: otpHash,
				expires_at: expiresAt
			})

			await this.otpCodesRepository.insert(otp)

			// Enviar e-mail com código OTP
			await this.emailService.sendEmail({
				to: ['ilgnersilva@outlook.com'],
				subject: 'Código de Autenticação',
				react: MFACode({ code: otpCode }),
			});
			
			return generateError(ERROR_TYPES.TWO_FACTOR_REQUIRED);
		}

		await this.verifyOTP(user, code)
		
		return await signIn('credentials', {
			user_id: user.user_id,
			name: user.name,
			email: user.email,
			provider: user.provider,
			picture: user.image,
			organizations:
				userOrganizations.length > 0 ? userOrganizations : undefined,
		})
	}
	private async verifyOTP(user: User, otpCode: string){
		const [otp] = (await this.otpCodesRepository.findOtpByUserId(user.user_id)) ?? []

		if(!otp || await this.passwordHasher.comparePasswords(otpCode, otp.code_hash))
			return generateError(ERROR_TYPES.INVALID_CODE)

		const otpInstance = new OtpCodes({
			user_id: otp.user_id,
			code_hash: otp.code_hash,
			is_used: true,
		})
		await this.otpCodesRepository.update(otpInstance)
	}
}