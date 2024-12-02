import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { usersTable } from './users'

export const sessionTable = mysqlTable('session', {
	sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
	userId: varchar('_user_id', { length: 255 })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})
