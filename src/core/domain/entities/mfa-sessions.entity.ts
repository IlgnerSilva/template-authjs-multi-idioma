import { z } from 'zod';

const mfaSessionSchema = z.object({
    mfa_sessions_id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    expires_at: z.date().optional(),
    created_at: z.date().optional(),
});

type mfaSessionProps = z.infer<typeof mfaSessionSchema>;

export class MfaSession{
    readonly mfa_sessions_id: string;
    readonly user_id: string;
    readonly expires_at: Date;
    readonly created_at: Date;

    constructor(props: mfaSessionProps){
        const validatedData = mfaSessionSchema.parse(props);
        this.mfa_sessions_id = validatedData.mfa_sessions_id || crypto.randomUUID();
        this.user_id = validatedData.user_id;
        this.expires_at = validatedData.expires_at || new Date(Date.now() + 10 * 60 * 1000);
        this.created_at = validatedData.created_at || new Date();
    }
}