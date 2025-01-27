export interface IPasswordHasherRepository {
	hashPassword(password: string): Promise<string>;
	comparePasswords(password: string, hash: string): Promise<boolean>;
}
