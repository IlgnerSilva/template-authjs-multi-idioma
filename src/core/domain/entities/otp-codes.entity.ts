import { z } from 'zod';

const OtpCodesSchema = z.object({
	otp_id: z.string().uuid().optional(),
	user_id: z.string().uuid(),
	code: z.string().min(6).max(6),
	created_at: z.date().optional(),
	expires_at: z.date().optional(),
	active: z.boolean().default(false),
});

type OtpCodesProps = z.infer<typeof OtpCodesSchema>;

export class OtpCodes {
	readonly otp_id: string;
	readonly user_id: string;
	readonly code: string;
	readonly created_at: Date;
	readonly expires_at: Date;
	readonly active: boolean;

	constructor(props: OtpCodesProps) {
		const validatedData = OtpCodesSchema.parse(props);
		this.otp_id = validatedData.otp_id || crypto.randomUUID();
		this.user_id = validatedData.user_id;
		this.code = validatedData.code;
		this.created_at = validatedData.created_at || new Date();
		this.expires_at = validatedData.expires_at || new Date();
		this.active = validatedData.active || false;
	}
}
