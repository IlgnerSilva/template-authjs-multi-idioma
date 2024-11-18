import { db } from '@/db/index'
import { usersTable } from '@/db/schemas/users'
import { eq } from 'drizzle-orm'

export const findByUserEmail = async (email: string) => {
	return await db.select().from(usersTable).where(eq(usersTable.email, email))
}
