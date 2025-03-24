import type React from 'react';

export interface IEmailService {
	sendEmail({
		to,
		subject,
		body,
		html,
		react,
	}: {
		to: [string];
		subject: string;
		body?: string;
		html?: React.JSX.Element;
		react?: React.ReactNode;
	}): Promise<void>;
}
