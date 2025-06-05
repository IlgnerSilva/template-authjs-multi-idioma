import type { auth as betterAuth } from '@/lib/better-auth/auth';

export type SessionResponse = typeof betterAuth.$Infer.Session | null;

type sessionDTO = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
    activeOrganizationId?: string | undefined;
    impersonatedBy?: string | undefined;
}

type userDTO = {
    banExpires: string;
    banReason: string;
    banned: string;
    createdAt: Date;
    email: string;
    emailVerified: boolean;
    id: string;
    image: string;
    name: string;
    role: string;
    twoFactorEnabled: boolean;
    updatedAt: Date;
}



//  type SessionResponse = sessionDTO | userDTO | null