import type { SessionOptions } from "iron-session";

export function createSessionOptions(cookieName: string): SessionOptions {
  return {
    password: 'minha_senha_segurasafjasgvfdjhvshjdvfjhdsvfhjsdvfvhjsavdjhsavdhjsa',
    cookieName: cookieName,
    cookieOptions: {
      httpOnly: true,
      secure: true,
    }
  };
}