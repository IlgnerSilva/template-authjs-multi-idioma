import { User } from '@core/domain/entities/user.entity';
import type {
	IUserRepository,
	IUsersRepositoryRequest,
} from '@core/domain/repositories/user.repository.interface';

export class AutheticateWithProvidersUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute(userProvider: IUsersRepositoryRequest) {
		const userFound = await this.usersRepository.findByEmail(
			userProvider.email,
		);

		if (!userFound) {
			const user = new User(userProvider);
			await this.usersRepository.insertUser(user);
			return true;
		}

		const { provider, name, email_verified } = userFound[0];

		if (!provider || (provider && provider === userProvider?.provider)) {
			if (!name || !email_verified) {
				const user = new User(userProvider);
				await this.usersRepository.updateUser(user);
			}
			return true;
		}
		return false;
	}
}
