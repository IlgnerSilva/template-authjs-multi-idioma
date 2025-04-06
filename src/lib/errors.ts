// errors.ts

// errors.ts
import type { MessageKeys } from 'next-intl'; // Ajuste a importação conforme seu setup
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

// Enum para os tipos de erro com códigos numéricos para facilitar o rastreamento
export enum ERROR_CODE {
	INVALID_EMAIL_OR_PASSWORD = 1001,
	INVALID_CODE = 1002,
	INVALID_CODE_EXPIRED = 1003,
	TWO_FACTOR_REQUIRED = 1004,
	USER_NOT_FOUND = 1005,
	MFA_LOCKED = 1006,
}

// Mapeamento entre códigos de erro e suas chaves de tradução
export const ERROR_KEYS: Record<ERROR_CODE, string> = {
	[ERROR_CODE.INVALID_EMAIL_OR_PASSWORD]: 'INVALID_EMAIL_OR_PASSWORD',
	[ERROR_CODE.INVALID_CODE]: 'INVALID_CODE',
	[ERROR_CODE.INVALID_CODE_EXPIRED]: 'INVALID_CODE_EXPIRED',
	[ERROR_CODE.TWO_FACTOR_REQUIRED]: 'TWO_FACTOR_REQUIRED',
	[ERROR_CODE.USER_NOT_FOUND]: 'USER_NOT_FOUND',
	[ERROR_CODE.MFA_LOCKED]: 'MFA_LOCKED',
};

// Interface aprimorada do erro retornado
export interface ErrorResponse {
	error: true;
	code: ERROR_CODE;
	message?: string; // Mensagem opcional para debugging
	details?: unknown; // Detalhes adicionais opcionais
	timestamp: number; // Timestamp para rastreamento
}

// Função para criar o erro com opções adicionais
export function generateError(
	code: ERROR_CODE,
	options?: {
		message?: string;
		details?: unknown;
	},
): ErrorResponse {
	return {
		error: true,
		code,
		message: options?.message,
		details: options?.details,
		timestamp: Date.now(),
	};
}

// Tipagem para respostas de sucesso para complementar os erros
export interface SuccessResponse<T = unknown> {
	error: false;
	data: T;
}

// Tipo para respostas gerais da API
export type ApiResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;

// Helper para verificar se uma resposta é um erro
export function isErrorResponse(
	response: ApiResponse,
): response is ErrorResponse {
	return response.error === true;
}

// Hook para tratar erros
export function useErrorHandler() {
	const errors = useTranslations('Errors');

	const handleApiError = (response: ApiResponse) => {
		if (!isErrorResponse(response)) return;

		// Obter a chave de tradução do erro
		const errorKey = ERROR_KEYS[response.code] || 'UNKNOWN_ERROR';

		// Exibir o erro com toast
		toast.error(errors(errorKey));

		// Opcionalmente logar para análise
		console.error(`Error [${response.code}]: ${errorKey}`, response);

		return errorKey;
	};

	return { handleApiError };
}
