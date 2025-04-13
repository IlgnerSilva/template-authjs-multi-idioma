import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { compare, hash } from 'bcrypt'
import { db } from "@/db";
import { schemas } from "@/db/schemas";
import {
    twoFactor,
    magicLink,
    emailOTP,
    admin,
    organization,
    jwt,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { resend } from "@/lib/resend"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schemas
        }
    }),
    trustedOrigins: ["http://localhost:3000", "https://3000-idx-template-authjs-multi-idiomagit-1742833803590.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev"],
    appName: "template-authjs-multi-idioma",
    advanced: {
      generateId: () => {
        return crypto.randomUUID();
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
        sendVerificationEmail: async ({user, token, url}, request) => {
            await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            })
        }
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
                    subject: "Verify your email address",
                    text: `Your OTP is: ${otp}`,
                })
            },
        }),
        magicLink({
            async sendMagicLink({ email, token, url }, request) {
                await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: email,
                    subject: "Verify your email address",
                    text: `Your OTP is: ${url}`,
                })
            },
        }),
        twoFactor(),
        nextCookies(),
    ],
});
