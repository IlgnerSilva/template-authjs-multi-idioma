import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { usersTable } from './users'

export const sessionsTable = sqliteTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})
