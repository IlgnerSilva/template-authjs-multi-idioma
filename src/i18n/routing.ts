import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// Lista de idiomas que serão suportados
	locales: ['en-US', 'pt-BR'],

	// Idioma padrão
	defaultLocale: 'en-US',
})

// Cria as funções de navegação
// Link, redirect, usePathname, useRouter
export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing)
