import { MfaSession } from '@/core/domain/entities/mfa-sessions.entity';
import type { IMfaSessions } from '@/core/domain/repositories/mfa-sessions.interface';
import { db } from '@/db/index';
import { tableMfaSessions } from '@drizzle/schemas/mfa_sessions';
import { desc, eq } from 'drizzle-orm';
import { injectable } from 'inversify';

@injectable()
export class MfaSessionsDrizzleRepository implements IMfaSessions {
    async findMFASessionsById(userId: string): Promise<MfaSession[] | null> {
        const mfaSession = await db.select().from(tableMfaSessions).where(eq(tableMfaSessions.user_id, userId)).orderBy(desc(tableMfaSessions.created_at));
        return mfaSession.map((mfaSessionData) => new MfaSession(mfaSessionData));
    }
    async findMFASessionsByUserId(userId: string): Promise<MfaSession[] | null> {
        const mfaSession = await db.select().from(tableMfaSessions).where(eq(tableMfaSessions.user_id, userId)).orderBy(desc(tableMfaSessions.created_at));
        return mfaSession.map((mfaSessionData) => new MfaSession(mfaSessionData));
    }

    async insert(data: MfaSession): Promise<void> {
        await db.insert(tableMfaSessions).values({
            user_id: data.user_id,
            mfa_sessions_id: data.mfa_sessions_id,
            created_at: data.created_at,
            expires_at: data.expires_at,
        }).execute();
    }
    
}