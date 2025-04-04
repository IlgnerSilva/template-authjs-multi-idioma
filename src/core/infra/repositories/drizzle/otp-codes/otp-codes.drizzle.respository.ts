import { OtpCodes } from '@/core/domain/entities/otp-codes.entity';
import type { IOtpCodes } from '@/core/domain/repositories/otp.repository.interface';
import { db } from '@drizzle/index';
import { tableOtpCodes } from '@drizzle/schemas/otp_codes';
import { desc, eq } from 'drizzle-orm';
import { injectable } from 'inversify';

@injectable()
export class OtpCodesDrizzleRepository implements IOtpCodes {
	async findOtpById(id: string) {
		const otpCodes = await db
			.select()
			.from(tableOtpCodes)
			.where(eq(tableOtpCodes.user_id, id))
			.limit(1);

		return otpCodes.map((otpCodesData) => new OtpCodes(otpCodesData));
	}
	async findOtpByUserId(userId: string): Promise<OtpCodes[]> {
		const otpCodes = await db
			.select()
			.from(tableOtpCodes)
			.where(eq(tableOtpCodes.user_id, userId))
			.orderBy(desc(tableOtpCodes.created_at))
			.limit(1);

		return otpCodes.map((otpCodesData) => new OtpCodes(otpCodesData));
	}
	async insert(data: OtpCodes): Promise<void> {
		await db.insert(tableOtpCodes).values(data).execute();
	}
}
