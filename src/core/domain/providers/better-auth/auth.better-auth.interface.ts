import type { AuthResponse } from './types/signinEmailAndPassword.types'

export abstract class IAuthBetterAuthProvider {
    abstract signinEmailAndPassword(email: string, password: string): Promise<AuthResponse>;
    abstract verifyTOTP(code: string): Promise<AuthResponse>;
}