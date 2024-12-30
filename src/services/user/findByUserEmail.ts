import { db } from '@/db/index';
import { tableUsers } from '@/db/schemas/users';
import { eq } from 'drizzle-orm';

export const findByUserEmail = async (email: string) => {
	return await db.select().from(tableUsers).where(eq(tableUsers.email, email));
};
