import { z } from 'zod';

const UserOrganizationSchema = z.object({
    user_id: z.string().uuid(),
    org_id: z.string().uuid().optional(),
    role: z.string().optional(),
    active: z.boolean().optional(),
});

type UserOrganizationProps = z.infer<typeof UserOrganizationSchema>;

export class UserOrganization {
    readonly user_id: string;
    readonly org_id: string
    readonly role: string
    readonly active: boolean

	constructor(props: UserOrganizationProps) {
		const validatedData = UserOrganizationSchema.parse(props);
        this.user_id = validatedData.user_id;
        this.org_id = validatedData.org_id || '';
        this.role = validatedData.role || '';
        this.active = validatedData.active || true;
	}
}
