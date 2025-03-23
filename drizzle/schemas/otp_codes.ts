import {
	pgTable,
	uuid,
	varchar,
	boolean,
	timestamp,
} from 'drizzle-orm/pg-core';
import { tableUsers } from './user';

export const tableOtpCodes = pgTable('otp_codes', {
	otp_id: uuid('otp_id').defaultRandom().primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => tableUsers.user_id, { onDelete: 'cascade' }),
	code: varchar('code', { length: 6 }).notNull(), // Código OTP de 6 dígitos
	created_at: timestamp('created_at').defaultNow().notNull(), // Data de criação
	expires_at: timestamp('expires_at')
		.$default(() => new Date(Date.now() + 10 * 60 * 1000))
		.notNull(),
	active: boolean('active').default(false).notNull(), // Define se já foi usado
});
