import { authRoutes, publicRoutes } from '@/config/routes'
import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import authConfig from './auth.config'
import { locales, routing } from './i18n/routing'

// Configuração do NextAuth com base no arquivo de configuração auth.config
const { auth } = NextAuth(authConfig)

// Middleware responsável pela internacionalização das rotas
const intlMiddleware = createMiddleware(routing)

// Função que testa se o caminho da URL corresponde a uma das rotas definidas
const testPathnameRegex = (pages: string[], pathName: string): boolean => {
	// Substitui rotas dinâmicas (com parâmetros) por expressões regulares
	const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, '[^/]+'))

	// Cria uma expressão regular para testar se o caminho (pathName) corresponde a uma das rotas
	return RegExp(
		`^(/(${locales.join('|')}))?(${pathsWithParams.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
		'i', // flag "i" para ignorar maiúsculas/minúsculas
	).test(pathName)
}

// Middleware de autenticação usando NextAuth
const authMiddleware = auth((req) => {
	// Verifica se a página solicitada faz parte das rotas de autenticação
	const isAuthPage = testPathnameRegex(authRoutes, req.nextUrl.pathname)
	// Verifica se o usuário está autenticado
	const isLogged = !!req.auth

	// Se o usuário não estiver autenticado e tentar acessar uma página que requer autenticação, redireciona para a página de login
	if (!isLogged && isAuthPage) {
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
	}

	// Se o usuário estiver autenticado e tentar acessar uma página de login, redireciona para a página inicial
	if (isLogged && isAuthPage) {
		return NextResponse.redirect(new URL('/', req.nextUrl))
	}

	// Se não for uma página de autenticação, continua o processo de internacionalização
	return intlMiddleware(req)
})

// Função principal do middleware que combina a autenticação e a internacionalização
const middleware = (req: NextRequest) => {
	// Verifica se a página solicitada é uma página pública (sem necessidade de autenticação)
	const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname)
	// Verifica se a página solicitada é uma página de autenticação
	const isAuthPage = testPathnameRegex(authRoutes, req.nextUrl.pathname)

	// Se for uma página de autenticação, executa o middleware de autenticação
	if (isAuthPage) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (authMiddleware as any)(req)
	}

	// Se for uma página pública, executa o middleware de internacionalização
	if (isPublicPage) {
		return intlMiddleware(req)
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		// Caso contrário, executa o middleware de autenticação (para páginas protegidas)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (authMiddleware as any)(req)
	}
}

// Configuração de correspondência para os caminhos que o middleware deve interceptar
export const config = {
	// A expressão regular garante que o middleware será aplicado a todas as rotas, exceto aquelas para API, Next.js e arquivos estáticos
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

export default middleware
