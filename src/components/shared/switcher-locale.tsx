'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { locales, usePathname } from '@/i18n/routing';
import { usePathname as usePath, useRouter } from 'next/navigation';

export function SwitcherLocale() {
	const pathname = usePathname(); // Defina dentro do componente de função
	const router = useRouter();
	const getLocale = usePath().split('/')[1].toUpperCase();

	const handleLocaleChange = (locale: string) => {
		// Mude o caminho para incluir o novo locale
		const href = `/${locale}${pathname}`;
		router.push(href);
	};

	return (
		<Select onValueChange={(e) => handleLocaleChange(e)}>
			<SelectTrigger className="w-24 p-1 max-h-max absolute top-2 right-2">
				<SelectValue placeholder={getLocale} />
			</SelectTrigger>
			<SelectContent>
				{locales.map((locale) => (
					<SelectItem key={locale} value={locale} className="cursor-pointer">
						{locale.toUpperCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
