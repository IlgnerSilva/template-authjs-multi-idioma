import type { MfaSession } from '@/core/domain/entities/mfa-sessions.entity';

export interface IMfaSessions {
	findMFASessionsById(userId: string): Promise<MfaSession[] | null>;
    findMFASessionsByUserId(userId: string): Promise<MfaSession[] | null>;
	insert(data: MfaSession): Promise<void>;
}
