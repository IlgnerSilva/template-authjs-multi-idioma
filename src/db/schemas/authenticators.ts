import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { usersTable } from './users'

export const authenticatorsTable = sqliteTable(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: text('userId')
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: integer('credentialBackedUp', {
			mode: 'boolean',
		}).notNull(),
		transports: text('transports'),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
)
