import { z } from 'zod';
import crypto from 'node:crypto';

const UserSchema = z.object({
  user_id: z.string().uuid().optional(),
  name: z.string().nullable().optional(),
  email: z.string().email(),
  password_hash: z.string().nullable().optional(),
  email_verified: z.boolean().nullable().optional(),
  two_factor_authentication: z.boolean().nullable().optional(),
  provider: z.string().nullable().optional(),
  provider_user_id: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  created_at: z.date().nullable().optional(),
  updated_at: z.date().nullable().optional(),
  mfa_locked_until: z.date().nullable().optional(),
  active: z.boolean().default(true),
});

// Tipo inferido do schema
type UserProps = z.infer<typeof UserSchema>;

export class User {
  readonly user_id: string;
  readonly name: string | null;
  readonly email: string;
  readonly password_hash: string | null;
  readonly email_verified: boolean | null;
  readonly two_factor_authentication: boolean | null;
  readonly provider: string | null;
  readonly provider_user_id: string | null;
  readonly image: string | null;
  readonly created_at: Date | null;
  readonly updated_at: Date | null;
  readonly mfa_locked_until: Date | null;
  readonly active: boolean;

  constructor(props: UserProps) {
    const validatedData = UserSchema.parse(props);
    
    this.user_id = validatedData.user_id || crypto.randomUUID();
    this.name = validatedData.name || null;
    this.email = validatedData.email;
    this.password_hash = validatedData.password_hash || null;
    this.email_verified = validatedData.email_verified || false;
    this.two_factor_authentication = validatedData.two_factor_authentication || false;
    this.provider = validatedData.provider || null;
    this.provider_user_id = validatedData.provider_user_id || null;
    this.image = validatedData.image || null;
    this.created_at = validatedData.created_at || new Date();
    this.updated_at = validatedData.updated_at || new Date();
    this.mfa_locked_until = validatedData.mfa_locked_until || null;
    this.active = validatedData.active;
  }

  // Métodos de negócio
  hasPassword(): boolean {
    return !!this.password_hash;
  }

  requiresTwoFactor(): boolean {
    return !!this.two_factor_authentication;
  }
}