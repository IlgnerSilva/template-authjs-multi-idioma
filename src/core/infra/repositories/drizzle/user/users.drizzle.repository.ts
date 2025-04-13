import type { IUserRepository } from '@/core/domain/repositories/user.repository.interface';
import {
	User
} from '@/core/domain/entities/user.entity';
import { db } from '@/db/index';
import { user as tableUsers } from '@/db/schemas';
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
		.where(eq(tableUsers.id, id))
		.limit(1);

		return user.map(userData => new User(userData))
	}
}
