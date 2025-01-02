import { db } from '@/db';
import { tableUsers } from '@/db/schemas/users';
type updateUser = typeof tableUsers.$inferInsert;

export function updateUser(user: updateUser) {
	return db.update(tableUsers).set(user);
}
