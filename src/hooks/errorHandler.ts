// Importações necessárias
import { useTranslations } from 'next-intl'; // assumindo que você usa next-intl
import { toast } from 'sonner'; // substitua por sua biblioteca de toast real

// Definindo o tipo de BASE_ERROR_CODES para garantir tipagem correta
export const BASE_ERROR_CODES = {
	USER_NOT_FOUND: "User not found",
	FAILED_TO_CREATE_USER: "Failed to create user",
	FAILED_TO_CREATE_SESSION: "Failed to create session",
	FAILED_TO_UPDATE_USER: "Failed to update user",
	FAILED_TO_GET_SESSION: "Failed to get session",
	INVALID_PASSWORD: "Invalid password",
	INVALID_EMAIL: "Invalid email",
	INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
	SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
	PROVIDER_NOT_FOUND: "Provider not found",
	INVALID_TOKEN: "invalid token",
	ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
	FAILED_TO_GET_USER_INFO: "Failed to get user info",
	USER_EMAIL_NOT_FOUND: "User email not found",
	EMAIL_NOT_VERIFIED: "Email not verified",
	PASSWORD_TOO_SHORT: "Password too short",
	PASSWORD_TOO_LONG: "Password too long",
	USER_ALREADY_EXISTS: "User already exists",
	EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
	CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
	SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.",
	FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account",
	ACCOUNT_NOT_FOUND: "Account not found",
} as const;

// Tipos para o manipulador de erros
type ErrorCode = keyof typeof BASE_ERROR_CODES;

/**
 * Tipo para o objeto de erro da API
 */
interface ApiError {
  code?: ErrorCode;
  message?: string;
}

/**
 * Hook para lidar com erros de API e exibir toasts traduzidos
 * 
 * @returns Objeto contendo funções para exibir toast de erro
 */
export const useApiErrorHandler = () => {
  // Obter a função de tradução
  const t = useTranslations('Errors');
  
  /**
   * Exibe um toast de erro com a mensagem traduzida correspondente ao código
   * 
   * @param errorCode - Código de erro da API (uma chave de BASE_ERROR_CODES)
   * @param defaultMessage - Mensagem padrão caso não haja tradução disponível
   */
  const showErrorToast = (errorCode: ErrorCode, defaultMessage?: string) => {
    try {
      // Tenta obter a tradução para o código de erro
      const translatedMessage = t(errorCode);
      
      // Exibe o toast com a mensagem traduzida
      toast.error(translatedMessage);
    } catch (error) {
      // Se não houver tradução disponível, usa a mensagem padrão ou o código bruto do erro
      const fallbackMessage = defaultMessage || BASE_ERROR_CODES[errorCode] || 'Erro desconhecido';
      toast.error(fallbackMessage);
      
      // Opcional: Log para desenvolvimento
      console.warn(`Tradução não encontrada para o código de erro: ${errorCode}`);
    }
  };

  /**
   * Função auxiliar para lidar com erros da API
   * 
   * @param error - Erro capturado do try/catch
   * @param defaultMessage - Mensagem padrão para erros sem código específico
   */
  const handleApiError = (error: unknown, defaultMessage = 'Ocorreu um erro. Tente novamente mais tarde.') => {
    // Verificar se é um erro da API com código
    if (
      typeof error === 'object' && 
      error !== null && 
      'code' in error && 
      typeof error.code === 'string' && 
      Object.keys(BASE_ERROR_CODES).includes(error.code as string)
    ) {
      showErrorToast(error.code as ErrorCode);
      return true; // Erro tratado
    } 
    
    // Erro não reconhecido
    toast.error(defaultMessage);
    return false; // Erro não tratado especificamente
  };

  return { showErrorToast, handleApiError };
};