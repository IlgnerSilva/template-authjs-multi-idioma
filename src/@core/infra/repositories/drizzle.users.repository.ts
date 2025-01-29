import 'reflect-metadata';

import { User, UserProps } from '@/@core/domain/entities/user.entity';
import type { IUserRepository } from '@/@core/domain/repositories/user.repository.interface';
import { db } from '@drizzle/index';
import { tableUsers } from '@drizzle/schemas/user';
import { eq } from 'drizzle-orm';

export class DrizzleUsersRepository implements IUserRepository {
	async findByEmail(email: string): Promise<User[]> {
		return await db
			.select()
			.from(tableUsers)
			.where(eq(tableUsers.email, email))
			.limit(1)
			.then((res) =>
				res.map((data) => {
					return new User(data);
				}),
			);
	}

	async findById(id: string): Promise<User[]> {
		return db
			.select()
			.from(tableUsers)
			.where(eq(tableUsers.user_id, id))
			.limit(1)
			.then((res) => res.map((data) => new User(data)));
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
