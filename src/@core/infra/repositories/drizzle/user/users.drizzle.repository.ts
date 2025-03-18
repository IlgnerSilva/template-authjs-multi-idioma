import type { IUserRepository } from '@/@core/infra/repositories/drizzle/user/user.repository.interface';
import type {
	UserInsertDTO,
	UserOutputDTO,
	UserUpdateDTO,
} from '@core/dtos/users';
import { db } from '@drizzle/index';
import { tableUsers } from '@drizzle/schemas/user';
import { eq } from 'drizzle-orm';
import { injectable } from 'inversify';

@injectable()
export class UsersDrizzleRepository implements IUserRepository {
	async findByEmail(email: string): Promise<UserOutputDTO[]> {
		return await db
			.select()
			.from(tableUsers)
			.where(eq(tableUsers.email, email))
			.limit(1);
	}

	async findById(id: string): Promise<UserOutputDTO[]> {
		return db
			.select()
			.from(tableUsers)
			.where(eq(tableUsers.user_id, id))
			.limit(1);
	}

	async insertUser(user: UserInsertDTO) {
		await db.insert(tableUsers).values(user);
	}

	async updateUser(user: UserUpdateDTO) {
		await db
			.update(tableUsers)
			.set(user)
			.where(eq(tableUsers.email, user.email));
	}
}
