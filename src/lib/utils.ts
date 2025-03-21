import { type ClassValue, clsx } from 'clsx';
import type { SessionOptions } from 'iron-session';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateOTP(numberOfDigits: number) {
	const digits = '0123456789';
	let OTP = '';
	const len = digits.length;
	for (let i = 0; i < numberOfDigits; i++) {
		OTP += digits[Math.floor(Math.random() * len)];
	}

	return OTP;
}

export function createSessionOptions(cookieName: string): SessionOptions {
	return {
		password:
			'minha_senha_segurasafjasgvfdjhvshjdvfjhdsvfhjsdvfvhjsavdjhsavdhjsa',
		cookieName: cookieName,
		cookieOptions: {
			httpOnly: true,
			secure: true,
		},
	};
}
