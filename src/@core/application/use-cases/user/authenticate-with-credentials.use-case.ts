import { signIn } from '@/auth';
import { ERROR_TYPES, createError } from '@/utils/errors';
import { getInjection } from '@core/di/container';

interface AuthenticateWithCredentialsUseCaseRequest {
	email: string;
	password: string;
	code?: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthenticateWithCredentialsUseCase {
	public static async execute({
		email,
		password,
		code,
	}: AuthenticateWithCredentialsUseCaseRequest) {
		const usersRepository = getInjection('IUserRepository');
		const [user] = await usersRepository.findByEmail(email);
		if (!user) throw createError(ERROR_TYPES.USER_NOT_FOUND);
		const passwordHasher = getInjection('IPasswordHasherRepository');

		if (
			user.password_hash &&
			!(await passwordHasher.comparePasswords(password, user.password_hash))
		)
			return createError(ERROR_TYPES.INVALID_EMAIL_OR_PASSWORD);
		if (user.two_factor_authentication) {
			if (code) {
				// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
				if (code == '123456')
					return await signIn('credentials', { values: user });
				return createError(ERROR_TYPES.INVALID_CODE);
			}

			return createError(ERROR_TYPES.TWO_FACTOR_REQUIRED);
		}

		return await signIn('credentials', { values: user });
	}
}
