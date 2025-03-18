import { tableOrganizations } from './organizations';
import { tablePlans } from './plans';
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const tableOrganizationPlans = pgTable('organization_plans', {
	org_id: uuid('org_id')
		.references(() => tableOrganizations.org_id, { onDelete: 'cascade' })
		.notNull(),
	plan_id: uuid('plan_id')
		.references(() => tablePlans.plan_id, { onDelete: 'cascade' })
		.notNull(),
	start_date: timestamp('start_date').defaultNow(),
	end_date: timestamp('end_date'),
});
