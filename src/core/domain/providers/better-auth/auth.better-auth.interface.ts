import type { AuthResponse } from './types/signinEmailAndPassword.types';
import type { SessionResponse } from "./types/userSessionAuth.types"

export abstract class IAuthBetterAuthProvider {
	abstract signinEmailAndPassword(
		email: string,
		password: string,
	): Promise<AuthResponse>;
	abstract verifyTOTP(code: string): Promise<AuthResponse>;
	abstract signout(): Promise<{ success: boolean }>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	abstract getSessionAuth(): Promise<SessionResponse>;
}
