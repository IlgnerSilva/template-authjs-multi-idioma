import type { IEmailService } from '@/core/domain/services/email.service.interface';
import { injectable } from 'inversify';
import { Resend } from 'resend';

@injectable()
export class EmailService implements IEmailService {
	private readonly resend: Resend;

	constructor() {
		this.resend = new Resend(process.env.RESEND_API_KEY);
	}

	async sendEmail({
		to,
		subject,
		react,
	}: {
		to: [string];
		subject: string;
		react?: React.ReactNode;
	}): Promise<void> {
		this.resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to,
			subject,
			react,
		});
	}
}
