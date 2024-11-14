import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import authConfig from './auth.config'
import { routing } from './i18n/routing'

// Configurações do NextAuth
const { auth } = NextAuth(authConfig)

// Middleware de autenticação
const authMiddleware = (req) => {
	const isLogged = !!req.auth
	console.log(req.nextUrl.locale)
	if (!isLogged) {
		// Redirecionar ou fazer algo se o usuário não estiver autenticado
	}
}

// Middleware de internacionalização
const intlMiddleware = createMiddleware(routing)

// Função para combinar os middlewares
export default async function middleware(req) {
	// Primeiro, execute a lógica do NextAuth (autenticação)
	await authMiddleware(req)

	// Em seguida, execute a lógica do Next-Intl (internacionalização)
	return intlMiddleware(req)
}

// Configuração de correspondência para os caminhos
export const config = {
	matcher: [
		// Exclui as rotas de API e arquivos estáticos
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
		// Adiciona as rotas de internacionalização
		'/',
		'/(pt-BR|en-US)/:path*',
	],
}
