// errors.ts

// Enum para os tipos de erro
export enum ERROR_TYPES {
	INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
	INVALID_CODE = 'INVALID_CODE',
	TWO_FACTOR_REQUIRED = 'TWO_FACTOR_REQUIRED',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
}

// Interface do erro retornado
export type ErrorResponse = {
	error: true;
	type: ERROR_TYPES;
};

// Função para criar o erro
export function createError(type: ERROR_TYPES): ErrorResponse {
	return {
		error: true,
		type,
	};
}
