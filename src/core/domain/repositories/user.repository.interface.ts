import type { User } from '@/core/domain/entities/user.entity';

export interface IUserRepository {
	findById: (id: string) => Promise<User[] | null>;
	findByEmail: (email: string) => Promise<User[] | null>;
	insertUser: (user: User) => Promise<void>;
	updateUser: (user: User) => Promise<void>;
}
