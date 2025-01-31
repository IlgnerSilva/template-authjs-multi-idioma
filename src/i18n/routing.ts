import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	// Lista de idiomas que serão suportados
	locales: ['en', 'pt'],

	// Idioma padrão
	defaultLocale: 'en',

	// Caminhos para cada idioma
	pathnames: {
		'/': '/',
		'/auth/login': {
			en: '/auth/login',
			pt: '/auth/login',
		},
	},
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { locales, defaultLocale, pathnames } = routing;

// Cria as funções de navegação
// Link, redirect, usePathname, useRouter
export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);
