export type authOutputDTO = {
	user_id: string;
	email: string;
	name: string;
	password_hash: string;
	email_verified: boolean;
	two_factor_authentication: boolean;
	provider: string;
	provider_user_id: string;
	created_at: Date;
	updated_at: Date;
	image: string;
	organization: [
		{
			organization_id: string;
			name: string;
			created_at: Date;
			updated_at: Date;
		},
	];
};
