import type { User, UserProps } from '@core/domain/entities/user.entity';

export interface IUserRepository {
	findById: (id: string) => Promise<User[]>;
	findByEmail: (email: string) => Promise<User[]>;
	insertUser: (user: User) => Promise<void>;
	updateUser: (user: User) => Promise<void>;
}

export type IUsersRepositoryRequest = UserProps;
