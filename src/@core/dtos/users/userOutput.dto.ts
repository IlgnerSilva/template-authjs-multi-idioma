export type UserOutputDTO = {
	user_id: string;
	name: string | null;
	email: string;
	password_hash: string | null;
	email_verified: boolean | null;
	two_factor_authentication: boolean | null;
	provider: string | null;
	provider_user_id: string | null;
	created_at: Date | null;
	updated_at: Date | null;
	image: string | null;
};
