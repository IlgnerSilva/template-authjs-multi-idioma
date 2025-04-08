// import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
// import authConfig from './auth.config';
import { locales, routing } from './i18n/routing';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

const publicRoutes = ['/auth/login', 'dashboard'];
const privateRoutes = ['/'];

// Configuração do NextAuth com base no arquivo de configuração auth.config
// const { auth } = NextAuth(authConfig);

// Middleware responsável pela internacionalização das rotas
const intlMiddleware = createMiddleware(routing);

// Função que testa se o caminho da URL corresponde a uma das rotas definidas
const testPathnameRegex = (pages: string[], pathName: string): boolean => {
	const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, '[^/]+'));
	return RegExp(
		`^(/(${locales.join('|')}))?(${pathsWithParams.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
		'i', // flag "i" para ignorar maiúsculas/minúsculas
	).test(pathName);
};

// Middleware de autenticação usando NextAuth
const authMiddleware = async (req: NextRequest) => {
	const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);
	const isProtectPage = testPathnameRegex(privateRoutes, req.nextUrl.pathname);

	const session = await auth.api.getSession({
        headers: await headers()
    })

	const isLogged = !!session;

	// Se o usuário não estiver autenticado e tentar acessar uma página que requer autenticação, redireciona para a página de login
	if (!isLogged && isProtectPage) {
		// Se já estiver tentando acessar a página de login, não redireciona
		if (req.nextUrl.pathname === '/auth/login') {
			return NextResponse.next(); // Deixa o usuário continuar na página de login
		}
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
	}

	// Se o usuário estiver autenticado e tentar acessar uma página de login, redireciona para a página inicial
	if (isLogged && isPublicPage) {
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}

	// Se não for uma página de autenticação, continua o processo de internacionalização
	return intlMiddleware(req);
};

// Função principal do middleware que combina a autenticação e a internacionalização
const middleware = (req: NextRequest) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (authMiddleware as any)(req);
};

// Configuração de correspondência para os caminhos que o middleware deve interceptar
export const config = {
	matcher: ['/((?!api|doc|rpc|spec|_next|_vercel|.*\\..*).*)'],
	runtime: 'nodejs'
};

export default middleware;
