import { db } from '@/db';
import { schemas } from '@/db/schemas';
import { resend } from '@/lib/resend';
import { compare, hash } from 'bcrypt';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import {
	admin,
	emailOTP,
	jwt,
	magicLink,
	organization,
	twoFactor,
} from 'better-auth/plugins';
import { env } from '@/env'
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			...schemas,
		},
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	trustedOrigins: [env.HOST],
	appName: 'template-authjs-multi-idioma',
	advanced: {
		database: {
			generateId: () => {
				return crypto.randomUUID();
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		password: {
			async verify(data) {
				return compare(data.password, data.hash);
			},
			async hash(password) {
				return hash(password, 6);
			},
		},
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, token, url }, request) => {
			await resend.emails.send({
				from: 'Acme <onboarding@resend.dev>',
				to: user.email,
				subject: 'Verify your email address',
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	plugins: [
		jwt(),
		organization(),
		admin(),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }, request) {
				await resend.emails.send({
					from: 'Acme <onboarding@resend.dev>',
					to: email,
					subject: 'Verify your email address',
					text: `Your OTP is: ${otp}`,
				});
			},
		}),
		magicLink({
			async sendMagicLink({ email, token, url }, request) {
				await resend.emails.send({
					from: 'Acme <onboarding@resend.dev>',
					to: email,
					subject: 'Verify your email address',
					text: `Your OTP is: ${url}`,
				});
			},
		}),
		twoFactor({
			issuer: 'better-auth.two_factor',
			skipVerificationOnEnable: true,
		}),
		nextCookies(),
	],
});
