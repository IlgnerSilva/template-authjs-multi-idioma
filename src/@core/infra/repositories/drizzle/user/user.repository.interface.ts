import type {
	UserInsertDTO,
	UserOutputDTO,
	UserUpdateDTO,
} from '@core/dtos/users';

export interface IUserRepository {
	findById: (id: string) => Promise<UserOutputDTO[]>;
	findByEmail: (email: string) => Promise<UserOutputDTO[]>;
	insertUser: (user: UserInsertDTO) => Promise<void>;
	updateUser: (user: UserUpdateDTO) => Promise<void>;
}
