import { randomUUID } from 'node:crypto';
import {
	boolean,
	mysqlTable,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';
//import { createSelectSchema } from 'drizzle-zod';

export const tableUsers = mysqlTable('users', {
	user_id: varchar('user_id', { length: 36 })
		.default(randomUUID())
		.notNull()
		.primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	name: varchar('name', { length: 255 }),
	password_hash: varchar('password_hash', { length: 255 }),
	emailVerified: boolean('email_verified').default(false),
	twoFactorAuthentication: boolean('two_factor_authentication').default(false),
	provider: varchar('provider', { length: 15 }),
	providerUserId: varchar('provider_user_id', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').onUpdateNow(),
	image: varchar('image', { length: 255 }),
});

//export const selectUsers = createSelectSchema(tableUsers);
