import { randomUUID } from 'node:crypto';
import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

type OptionalFields<T> = {
	[K in keyof T]: null | undefined extends T[K] ? T[K] | undefined : T[K];
};

export const tableUsers = pgTable('users', {
	user_id: uuid('user_id')
		.$default(() => randomUUID())
		.notNull()
		.primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	name: varchar('name', { length: 255 }),
	password_hash: varchar('password_hash', { length: 255 }),
	email_verified: boolean('email_verified').default(false), // alterado para correspondência com a nomenclatura do banco
	two_factor_authentication: boolean('two_factor_authentication').default(
		false,
	),
	provider: varchar('provider', { length: 15 }),
	provider_user_id: varchar('provider_user_id', { length: 255 }), // alterado para correspondência com a nomenclatura do banco
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').$onUpdate(() => new Date()),
	image: varchar('image', { length: 255 }),
});

export type User = typeof tableUsers.$inferSelect;
export type UsersCreateInput = OptionalFields<typeof tableUsers.$inferInsert>;
//export const insertUserSchema = createInsertSchema(tableUsers);
