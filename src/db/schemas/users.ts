import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const usersTable = mysqlTable('user', {
	id: varchar('user_id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).unique(),
	password: varchar('password_hash', {length: 255}),
	emailVerified: timestamp('email_verified', {
		mode: 'date',
		fsp: 3,
	}),
	image: varchar('image', { length: 255 }),
})
