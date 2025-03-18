import { tablePermissions } from './permissions';
import { tableRoles } from './roles';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const tableRolePermissions = pgTable('role_permissions', {
	role_id: uuid('role_id')
		.references(() => tableRoles.role_id, { onDelete: 'cascade' })
		.notNull(),
	permission_id: uuid('permission_id')
		.references(() => tablePermissions.permission_id, { onDelete: 'cascade' })
		.notNull(),
});
