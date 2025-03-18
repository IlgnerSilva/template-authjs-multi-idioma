import { pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { tableOrganizations } from './organizations';
import { tableUsers } from './user';

export const tableUserOrganizations = pgTable('user_organizations', {
	user_id: uuid('user_id')
		.references(() => tableUsers.user_id, { onDelete: 'cascade' })
		.notNull(),
	org_id: uuid('org_id')
		.references(() => tableOrganizations.org_id, { onDelete: 'cascade' })
		.notNull(),
	role: varchar('role', { length: 50 }).notNull(), // Admin, Editor, Viewer
	active: boolean('active').default(true).notNull(),
});
