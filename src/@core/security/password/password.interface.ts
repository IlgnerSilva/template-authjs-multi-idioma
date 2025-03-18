export interface IPassword {
	hashPassword(password: string): Promise<string>;
	comparePasswords(password: string, hash: string): Promise<boolean>;
}
