import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { createSymbol } from '@/core/di/utils/createSymbols.util';

export const BETTERAUTHPROVIDER_SYMBOLS = {
	IAuthBetterAuthProvider: createSymbol<IAuthBetterAuthProvider>('IAuthBetterAuthProvider'),
} as const;