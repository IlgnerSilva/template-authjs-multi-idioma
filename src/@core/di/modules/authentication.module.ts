import { ContainerModule, type interfaces } from 'inversify';
import { DI_SYMBOLS } from '../types';
import type { IPasswordHasherRepository } from '@core/domain/repositories/password-hasher.repository.interface';
import type { IUserRepository } from '@core/domain/repositories/user.repository.interface';
import { BcryptPasswordHasherRepository } from '@core/domain/entities/bcrypt.password-hasher.repository';
import { DrizzleUsersRepository } from '@core/infra/repositories/drizzle.users.repository';

const initializeModule = (bind: interfaces.Bind) => {
	bind<IPasswordHasherRepository>(DI_SYMBOLS.IPasswordHasherRepository).to(
		BcryptPasswordHasherRepository,
	);
	bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(DrizzleUsersRepository);
};

export const AuthenticationModule = new ContainerModule(initializeModule);
