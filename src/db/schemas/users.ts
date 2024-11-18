import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const usersTable = mysqlTable('user', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).unique(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		fsp: 3,
	}),
	image: varchar('image', { length: 255 }),
})
