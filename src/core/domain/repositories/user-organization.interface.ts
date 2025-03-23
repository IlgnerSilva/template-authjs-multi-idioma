import type {
	UserOrganization
} from '@/core/domain/entities/user-organization.entity';

export interface IUserOrganizationRepository {
	findOrganizationsByUserId: (
		userId: string,
	) => Promise<UserOrganization[]>;
	addUserToOrganization: (user: UserOrganization) => Promise<void>;
	activeOrInactivateUserFromOrganization: ({
		user_id,
		org_id,
		active,
	}: UserOrganization) => Promise<void>;
	updateUserRole: (user: UserOrganization) => Promise<void>;
}
