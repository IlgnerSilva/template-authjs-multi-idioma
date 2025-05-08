// Sua interface original
type ResponseDTO = {
    redirect?: boolean;
    token: string;
    url?: string | undefined;
    user: {
        id: string;
        email: string;
        name: string;
        image: string | null | undefined;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
};

// Tipos adicionais para cobrir outros casos
type ApiErrorDTO = {
    defined: false;
    code: string;
    status: number;
    message: string;
    data: {
        code: string;
        message: string;
    };
};

type TwoFactorRedirectDTO = {
    twoFactorRedirect: true;
};

// União de todos os tipos
export type AuthResponse = ResponseDTO | ApiErrorDTO | TwoFactorRedirectDTO;