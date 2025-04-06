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
			.orderBy(desc(tableOtpCodes.created_at));

		return otpCodes.map((otpCodesData) => new OtpCodes(otpCodesData));
	}
	async insert(data: OtpCodes): Promise<void> {
		await db.insert(tableOtpCodes).values(data).execute();
	}

	async update(data: OtpCodes): Promise<void> {
		await db
			.update(tableOtpCodes)
			.set(data)
			.where(eq(tableOtpCodes.otp_code_id, data.otp_code_id))
			.execute();
	}

	async deleteById (id: string): Promise<void> {
		await db
			.delete(tableOtpCodes)
			.where(eq(tableOtpCodes.otp_code_id, id))
			.execute();
	}

	async deleteAllByUserId(userId: string): Promise<void> {
		await db
			.delete(tableOtpCodes)
			.where(eq(tableOtpCodes.user_id, userId))
			.execute();
	}
}
