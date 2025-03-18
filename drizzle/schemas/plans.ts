import { randomUUID } from 'node:crypto';
import {
	pgTable,
	uuid,
	text,
	varchar,
	numeric,
	timestamp,
} from 'drizzle-orm/pg-core';

export const tablePlans = pgTable('plans', {
	plan_id: uuid('plan_id')
		.$default(() => randomUUID())
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	price: numeric('price', { precision: 10, scale: 2 }).notNull(),
	features: text('features'), // JSON com recursos do plano
	created_at: timestamp('created_at').defaultNow(),
});
