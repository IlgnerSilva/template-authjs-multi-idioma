import {
	pgTable,
	uuid,
	timestamp,
} from 'drizzle-orm/pg-core';
import { tableUsers } from './user';

export const tableMfaSessions = pgTable('mfa_sessions', {
	mfa_sessions_id: uuid('mfa_sessions_id').defaultRandom().primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => tableUsers.user_id, { onDelete: 'cascade' }),
    expires_at: timestamp('expires_at')
    .$default(() => new Date(Date.now() + 10 * 60 * 1000))
    .notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});


