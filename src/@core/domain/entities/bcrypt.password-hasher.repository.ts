import type { IPasswordHasherRepository } from '@core/domain/repositories/password-hasher.repository.interface';
import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

export class BcryptPasswordHasherRepository
	implements IPasswordHasherRepository
{
	private readonly saltRounds: number;
	constructor(saltRounds = 6) {
		this.saltRounds = saltRounds;
	}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}
	async comparePasswords(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
