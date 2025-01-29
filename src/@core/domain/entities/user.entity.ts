import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export const userProposSchema = z.object({
	user_id: z
		.string()
		.default(() => randomUUID())
		.nullable()
		.optional(),
	email: z.string().email(),
	name: z.string().nullable().optional(),
	password_hash: z.string().min(6).nullable().optional(),
	email_verified: z.boolean().default(false).nullable().optional(),
	two_factor_authentication: z.boolean().default(false).nullable().optional(),
	provider: z.string().nullable().optional(),
	provider_user_id: z.string().nullable().optional(),
	created_at: z.date().nullable().optional(),
	updated_at: z.date().nullable().optional(),
	image: z.string().nullable().optional(),
});

export type UserProps = z.infer<typeof userProposSchema>;

export class User {
	constructor(private props: UserProps) {
		this.validate();
	}

	get id() {
		return this.props.user_id;
	}

	get email() {
		return this.props.email;
	}

	get name() {
		return this.props.name;
	}

	get password_hash() {
		return this.props.password_hash;
	}

	get email_verified() {
		return this.props.email_verified;
	}

	get two_factor_authentication() {
		return this.props.two_factor_authentication;
	}

	get provider() {
		return this.props.provider;
	}

	get provider_user_id() {
		return this.props.provider_user_id;
	}

	get image() {
		return this.props.image;
	}

	toJSON() {
		return this.props;
	}

	private validate() {
		userProposSchema.parse(this.props);
	}
}
