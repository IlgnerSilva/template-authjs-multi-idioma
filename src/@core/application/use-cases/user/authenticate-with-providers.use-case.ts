import { getInjection } from '@/@core/di/container';
import { User } from '@core/domain/entities/user.entity';
import type {
	IUserRepository,
	IUsersRepositoryRequest,
} from '@core/domain/repositories/user.repository.interface';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AutheticateWithProvidersUseCase {
	static async execute(userProvider: IUsersRepositoryRequest) {
		const usersRepository = getInjection('IUserRepository');
		const userFound = await usersRepository.findByEmail(userProvider.email);

		if (!userFound) {
			const user = new User(userProvider);
			await usersRepository.insertUser(user);
			return true;
		}

		const { provider, name, email_verified } = userFound[0];

		if (!provider || (provider && provider === userProvider?.provider)) {
			if (!name || !email_verified) {
				const user = new User(userProvider);
				await usersRepository.updateUser(user);
			}
			return true;
		}
		return false;
	}
}
