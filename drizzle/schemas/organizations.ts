import { randomUUID } from 'node:crypto';
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const tableOrganizations = pgTable('organizations', {
	org_id: uuid('org_id')
		.$default(() => randomUUID())
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').$onUpdate(() => new Date()),
});
