import { randomUUID } from 'node:crypto';
import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

export const tableRoles = pgTable('roles', {
	role_id: uuid('role_id')
		.$default(() => randomUUID())
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	description: text('description'),
});
