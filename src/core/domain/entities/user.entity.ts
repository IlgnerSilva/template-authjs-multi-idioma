import { z } from 'zod';
import crypto from 'node:crypto';

const UserSchema = z.object({
  id: z.string().uuid().nullable(),
  name: z.string().min(3).max(255).nullable(),
  email: z.string().email(),
  emailVerified: z.boolean().nullable(),
  image: z.string().url().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  role: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  banExpires: z.date().nullable(),
  twoFactorEnabled: z.boolean().nullable(),
});

// Tipo inferido do schema
type UserProps = z.infer<typeof UserSchema>;

export class User {
  readonly id: string | null;
  readonly name: string | null;
  readonly email: string;
  readonly emailVerified: boolean | null;
  readonly image: string | null;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly role: string | null;
  readonly banned: boolean | null;
  readonly banReason: string | null;
  readonly banExpires: Date | null;
  readonly twoFactorEnabled: boolean | null;

  constructor(props: UserProps) {
    const validatedData = UserSchema.parse(props);
    this.id = validatedData.id || crypto.randomUUID();
    this.name = validatedData.name || null;
    this.email = validatedData.email;
    this.emailVerified = validatedData.emailVerified || false;
    this.image = validatedData.image || null;
    this.twoFactorEnabled = validatedData.twoFactorEnabled || false;
    this.createdAt = validatedData.createdAt || null;
    this.createdAt = validatedData.createdAt || new Date();
    this.updatedAt = validatedData.updatedAt || new Date();
    this.role = validatedData.role || null;
    this.banned = validatedData.banned || null;
    this.banReason = validatedData.banReason || null;
    this.banExpires = validatedData.banExpires || null;
    this.twoFactorEnabled = validatedData.twoFactorEnabled || null;
  }

  requiresTwoFactor(): boolean {
    return !!this.twoFactorEnabled;
  }
}