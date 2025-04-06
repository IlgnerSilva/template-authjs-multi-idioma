import {
	pgTable,
	uuid,
	varchar,
	boolean,
	timestamp,
	integer,
} from 'drizzle-orm/pg-core';
import { tableUsers } from './user';

export const tableOtpCodes = pgTable('otp_codes', {
	otp_code_id: uuid('otp_code_id').defaultRandom().primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => tableUsers.user_id, { onDelete: 'cascade' }),
	code_hash: varchar('code', { length: 6 }).notNull(),
	expires_at: timestamp('expires_at')
	.$default(() => new Date(Date.now() + 10 * 60 * 1000))
	.notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	resend_attempts: integer('resend_attempts').default(0).notNull(),
	failed_attempts: integer('failed_attempts').default(0).notNull(),
	is_used: boolean('is_used').default(false).notNull(),
});
