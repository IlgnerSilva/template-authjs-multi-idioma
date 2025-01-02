import { db } from '@/db';
import { tableUsers } from '@/db/schemas/users';
type insertUser = typeof tableUsers.$inferInsert;

export function insertUser(user: insertUser) {
	return db.insert(tableUsers).values(user);
}
