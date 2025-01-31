import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
	children,
	params,
}: { children: React.ReactNode; params: Params }) {
	const { locale } = await params;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	if (!routing.locales.includes(locale as any)) {
		console.error(routing.locales);
		console.error(locale);
		notFound();
	}
	const dictionary = await getMessages();
	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={dictionary}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
