import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

// ------ CÓDIGOS DE ERRO E SUCESSO ------
export enum ERROR_CODE {
	INVALID_EMAIL_OR_PASSWORD = 1001,
	INVALID_CODE = 1002,
	INVALID_CODE_EXPIRED = 1003,
	TWO_FACTOR_REQUIRED = 1004,
	USER_NOT_FOUND = 1005,
	MFA_LOCKED = 1006,
}

export enum SUCCESS_CODE {
	LOGIN_SUCCESS = 2001,
	LOGOUT_SUCCESS = 2002,
	PROFILE_UPDATED = 2003,
	PASSWORD_CHANGED = 2004,
	INVITATION_SENT = 2005,
	CODE_SENT = 2006,
	USER_CREATED = 2007,
}

// ------ INTERFACES DE RESPOSTA ------
export interface ErrorResponse {
	error: true;
	code: ERROR_CODE;
	message?: string;
	details?: unknown;
	timestamp: number;
}

export interface SuccessResponse<T = unknown> {
	error: false;
	code?: SUCCESS_CODE;
	data: T;
	message?: string;
	timestamp: number;
}

export type ApiResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;

// ------ MAPEAMENTO DE CÓDIGOS (privado) ------
const ERROR_KEYS: Record<ERROR_CODE, string> = {
	[ERROR_CODE.INVALID_EMAIL_OR_PASSWORD]: 'INVALID_EMAIL_OR_PASSWORD',
	[ERROR_CODE.INVALID_CODE]: 'INVALID_CODE',
	[ERROR_CODE.INVALID_CODE_EXPIRED]: 'INVALID_CODE_EXPIRED',
	[ERROR_CODE.TWO_FACTOR_REQUIRED]: 'TWO_FACTOR_REQUIRED',
	[ERROR_CODE.USER_NOT_FOUND]: 'USER_NOT_FOUND',
	[ERROR_CODE.MFA_LOCKED]: 'MFA_LOCKED',
};

const SUCCESS_KEYS: Record<SUCCESS_CODE, string> = {
	[SUCCESS_CODE.LOGIN_SUCCESS]: 'LOGIN_SUCCESS',
	[SUCCESS_CODE.LOGOUT_SUCCESS]: 'LOGOUT_SUCCESS',
	[SUCCESS_CODE.PROFILE_UPDATED]: 'PROFILE_UPDATED',
	[SUCCESS_CODE.PASSWORD_CHANGED]: 'PASSWORD_CHANGED',
	[SUCCESS_CODE.INVITATION_SENT]: 'INVITATION_SENT',
	[SUCCESS_CODE.CODE_SENT]: 'CODE_SENT',
	[SUCCESS_CODE.USER_CREATED]: 'USER_CREATED',
};

// ------ FUNÇÕES GERADORAS DE RESPOSTA ------
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

export function generateSuccess<T = unknown>(
	data: T,
	options?: {
		code?: SUCCESS_CODE;
		message?: string;
	},
): SuccessResponse<T> {
	return {
		error: false,
		code: options?.code,
		data,
		message: options?.message,
		timestamp: Date.now(),
	};
}

// ------ HELPERS (apenas para uso interno) ------
function isErrorResponse(response: ApiResponse): response is ErrorResponse {
	return response.error === true;
}

function isSuccessResponse<T>(
	response: ApiResponse<T>,
): response is SuccessResponse<T> {
	return response.error === false;
}

// ------ HOOK DE GERENCIAMENTO DE RESPOSTAS ------
export function useResponseHandler() {
	const errors = useTranslations('Errors');
	const success = useTranslations('Success');

	const handleApiResponse = (
		response: ApiResponse,
		options?: {
			showToast?: boolean;
			logResponse?: boolean;
		},
	) => {
		const showToast = options?.showToast ?? true;
		const logResponse = options?.logResponse ?? false;

		if (isErrorResponse(response)) {
			const errorKey = ERROR_KEYS[response.code] || 'UNKNOWN_ERROR';

			if (showToast) {
				toast.error(errors(errorKey));
			}

			if (logResponse) {
				console.error(`Error [${response.code}]: ${errorKey}`, response);
			}

			return { success: false, messageKey: errorKey };
		}

		if (response.code) {
			const successKey = SUCCESS_KEYS[response.code] || 'OPERATION_SUCCESS';

			if (showToast) {
				toast.success(success(successKey));
			}

			if (logResponse) {
				console.log(`Success [${response.code}]: ${successKey}`, response);
			}

			return { success: true, messageKey: successKey, data: response.data };
		}

		return { success: true, data: response.data };
	};

	return {
		handleApiResponse,
	};
}
