import { z } from 'zod';

const OtpCodesSchema = z.object({
	otp_code_id: z.string().uuid().optional(),
	user_id: z.string().uuid(),
	code_hash: z.string().min(6).max(6),
	created_at: z.date().optional(),
	expires_at: z.date().optional(),
	resend_attempts: z.number().optional(),
	failed_attempts: z.number().optional(),
	is_used: z.boolean().optional(),
});

type OtpCodesProps = z.infer<typeof OtpCodesSchema>;

export class OtpCodes {
	readonly otp_code_id: string;
	readonly user_id: string;
	readonly code_hash: string;
	readonly created_at: Date;
	readonly expires_at: Date;
	readonly resend_attempts: number;
	readonly failed_attempts: number;
	readonly is_used: boolean;

	constructor(props: OtpCodesProps) {
		const validatedData = OtpCodesSchema.parse(props);
		this.otp_code_id = validatedData.otp_code_id || crypto.randomUUID();
		this.user_id = validatedData.user_id;
		this.code_hash = validatedData.code_hash;
		this.created_at = validatedData.created_at || new Date();
		this.expires_at = validatedData.expires_at || new Date(Date.now() + 10 * 60 * 1000);
		this.resend_attempts = validatedData.resend_attempts || 0;
		this.failed_attempts = validatedData.failed_attempts || 0;
		this.is_used = validatedData.is_used || false;
	}
}
