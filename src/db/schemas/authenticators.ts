import {
	boolean,
	int,
	mysqlTable,
	primaryKey,
	varchar,
} from 'drizzle-orm/mysql-core'
import { usersTable } from './users'

export const authenticatorTable = mysqlTable(
	'authenticator',
	{
		credentialID: varchar('credential_id', { length: 255 }).notNull().unique(),
		userId: varchar('_user_id', { length: 255 })
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
		credentialPublicKey: varchar('credential_public_key', {
			length: 255,
		}).notNull(),
		counter: int('counter').notNull(),
		credentialDeviceType: varchar('credential_device_type', {
			length: 255,
		}).notNull(),
		credentialBackedUp: boolean('credential_backed_up').notNull(),
		transports: varchar('transports', { length: 255 }),
	},
	(authenticator) => ({
		compositePk: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
)
