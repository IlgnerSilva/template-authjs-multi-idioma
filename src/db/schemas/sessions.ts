import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { usersTable } from './users'

export const sessionTable = mysqlTable('session', {
	sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
	userId: varchar('userId', { length: 255 })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})
