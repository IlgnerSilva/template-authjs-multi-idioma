import { int, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import type { AdapterAccountType } from 'next-auth/adapters'
import { usersTable } from './users'

export const accountsTable = mysqlTable(
	'account',
	{
		userId: varchar('_user_id', { length: 255 })
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		type: varchar('type', { length: 255 })
			.$type<AdapterAccountType>()
			.notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
		refresh_token: varchar('refresh_token', { length: 255 }),
		access_token: varchar('access_token', { length: 255 }),
		expires_at: int('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: varchar('id_token', { length: 2048 }),
		session_state: varchar('session_state', { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
)
