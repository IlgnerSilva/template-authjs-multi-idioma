import type {
	UserOrganizationInput,
	UserOrganizationOutput,
} from '@core/dtos/user-organizations';

export interface IUserOrganizationRepository {
	findOrganizationsByUserId: (
		userId: string,
	) => Promise<UserOrganizationOutput[]>;
	addUserToOrganization: (user: UserOrganizationInput) => Promise<void>;
	activeOrInactivateUserFromOrganization: ({
		user_id,
		org_id,
		active,
	}: UserOrganizationInput) => Promise<void>;
	updateUserRole: (user: UserOrganizationInput) => Promise<void>;
}
