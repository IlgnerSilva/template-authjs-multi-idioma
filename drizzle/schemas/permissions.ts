import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const tablePermissions = pgTable('permissions', {
	permission_id: uuid('permission_id')
		.$default(() => randomUUID())
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	description: text('description'),
});
