import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const twoFactor = pgTable("two_factor", {
    id: text("id").primaryKey(),
    secret: text('secret').notNull(),
backupCodes: text('backup_codes').notNull(),
userId: uuid('id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const verification = pgTable("verification", {
    id: uuid("id").primaryKey(),
    identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expires_at').notNull(),
createdAt: timestamp('created_at'),
updatedAt: timestamp('updated_at')
});

export const user = pgTable("user", {
	id: uuid("id").primaryKey(),
	name: text('name').notNull(),
email: text('email').notNull().unique(),
emailVerified: boolean('email_verified').notNull(),
image: text('image'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
twoFactorEnabled: boolean('two_factor_enabled')
});

export const userOrganizations = pgTable('user_organizations', {
	id: uuid('id')
		.references(() => user.id, { onDelete: 'cascade' })
		.notNull(),
	org_id: uuid('org_id')
		.references(() => organizations.org_id, { onDelete: 'cascade' })
		.notNull(),
	role: varchar('role', { length: 50 }).notNull(), // Admin, Editor, Viewer
	active: boolean('active').default(true).notNull(),
});

export const session = pgTable("session", {
    id: uuid("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
token: text('token').notNull().unique(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: uuid('id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const roles = pgTable('roles', {
	role_id: uuid('role_id')
		
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	description: text('description'),
});


export const rolePermissions = pgTable('role_permissions', {
	role_id: uuid('role_id')
		.references(() => roles.role_id, { onDelete: 'cascade' })
		.notNull(),
	permission_id: uuid('permission_id')
		.references(() => permissions.permission_id, { onDelete: 'cascade' })
		.notNull(),
});

export const plans = pgTable('plans', {
	plan_id: uuid('plan_id')
		
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	price: numeric('price', { precision: 10, scale: 2 }).notNull(),
	features: text('features'), // JSON com recursos do plano
	created_at: timestamp('created_at').defaultNow(),
});

export const permissions = pgTable('permissions', {
	permission_id: uuid('permission_id')
		
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	description: text('description'),
});

export const otpCodes = pgTable('otp_codes', {
	otp_code_id: uuid('otp_code_id').defaultRandom().primaryKey(),
	id: uuid('id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	code_hash: varchar('code', { length: 6 }).notNull(),
	expires_at: timestamp('expires_at')
	.$default(() => new Date(Date.now() + 10 * 60 * 1000))
	.notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	resend_attempts: integer('resend_attempts').default(0).notNull(),
	failed_attempts: integer('failed_attempts').default(0).notNull(),
	is_used: boolean('is_used').default(false).notNull(),
});

export const organizations = pgTable('organizations', {
	org_id: uuid('org_id')
		
		.notNull()
		.primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const organizationPlans = pgTable('organization_plans', {
	org_id: uuid('org_id')
		.references(() => organizations.org_id, { onDelete: 'cascade' })
		.notNull(),
	plan_id: uuid('plan_id')
		.references(() => plans.plan_id, { onDelete: 'cascade' })
		.notNull(),
	start_date: timestamp('start_date').defaultNow(),
	end_date: timestamp('end_date'),
});

export const account = pgTable("account", {
    id: uuid("id").primaryKey(),
    accountId: text('account_id').notNull(),
providerId: text('provider_id').notNull(),
userId: uuid('id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
accessToken: text('access_token'),
refreshToken: text('refresh_token'),
idToken: text('id_token'),
accessTokenExpiresAt: timestamp('access_token_expires_at'),
refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
scope: text('scope'),
password: text('password'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull()
});

export const schemas = {
	account,
	organizationPlans,
	organizations,
	otpCodes,
	permissions,
	plans,
	rolePermissions,
	roles,
	session,
	userOrganizations,
	user,
	verification,
	twoFactor
}