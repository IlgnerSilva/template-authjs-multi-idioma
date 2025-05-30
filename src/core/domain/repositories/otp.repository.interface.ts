import type { OtpCodes } from '@/core/domain/entities/otp-codes.entity';

export interface IOtpCodes {
	findOtpById(userId: string): Promise<OtpCodes[] | null>;
	findOtpByUserId(userId: string): Promise<OtpCodes[] | null>;
	insert(data: OtpCodes): Promise<void>;
	update(data: OtpCodes): Promise<void>;
	deleteById(id: string): Promise<void>;
	deleteAllByUserId(userId: string): Promise<void>;
}
