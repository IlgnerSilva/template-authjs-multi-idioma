import type {
	UserOrganizationInput,
	UserOrganizationOutput,
} from '@/core/dtos/user-organizations';
import type { IUserOrganizationRepository } from '@/core/domain/repositories/user-organization.interface';
import { db } from '@/db/index';
import { tableOrganizations } from '@drizzle/schemas/organizations';
import { tableUserOrganizations } from '@drizzle/schemas/user_organizations';
import { and, eq } from 'drizzle-orm';
import { injectable } from 'inversify';

@injectable()
export class UserOrganizationDrizzleRepository
	implements IUserOrganizationRepository
{
	async findOrganizationsByUserId(
		userId: string,
	): Promise<UserOrganizationOutput[]> {
		return await db
			.select({
				user_id: tableUserOrganizations.user_id,
				org_id: tableUserOrganizations.org_id,
				role: tableUserOrganizations.role,
				active: tableUserOrganizations.active,
			})
			.from(tableUserOrganizations)
			.innerJoin(
				tableOrganizations,
				eq(tableUserOrganizations.org_id, tableOrganizations.org_id),
			)
			.where(eq(tableUserOrganizations.user_id, userId));
	}
	async addUserToOrganization(user: UserOrganizationInput): Promise<void> {
		await db.insert(tableUserOrganizations).values(user);
	}
	async activeOrInactivateUserFromOrganization({
		active,
		org_id,
		user_id,
	}: UserOrganizationInput): Promise<void> {
		await db
			.update(tableUserOrganizations)
			.set({ active })
			.where(
				and(
					eq(tableUserOrganizations.org_id, org_id),
					eq(tableUserOrganizations.user_id, user_id),
				),
			);
	}
	async updateUserRole({
		role,
		org_id,
		user_id,
	}: UserOrganizationInput): Promise<void> {
		await db
			.update(tableUserOrganizations)
			.set({ role })
			.where(
				and(
					eq(tableUserOrganizations.org_id, org_id),
					eq(tableUserOrganizations.user_id, user_id),
					eq(tableUserOrganizations.active, true),
				),
			);
	}
}
