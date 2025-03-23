import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import {
	User
} from '@/core/domain/entities/user.entity';
import { db } from '@drizzle/index';
import { tableUsers } from '@drizzle/schemas/user';
import { eq } from 'drizzle-orm';
import { injectable } from 'inversify';

@injectable()
export class UsersDrizzleRepository implements IUserRepository {
	async findByEmail(email: string) {
		const user = await db
			.select()
			.from(tableUsers)
			.where(eq(tableUsers.email, email))
			.limit(1);
		
			return user.map(userData => new User(userData))
	}

	async findById(id: string) {
		const user = await db
		.select()
		.from(tableUsers)
		.where(eq(tableUsers.user_id, id))
		.limit(1);

		return user.map(userData => new User(userData))
	}

	async insertUser(user: User) {
		await db.insert(tableUsers).values(user);
	}

	async updateUser(user: User) {
		await db
			.update(tableUsers)
			.set(user)
			.where(eq(tableUsers.email, user.email));
	}
}
