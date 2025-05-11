import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale;

	// Ensure that a valid locale is used
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: {
			...(await import(`../../../dictionary/${locale}.json`)).default,
			...(await import(`../../../dictionary/zod/${locale}.json`)).default,
		},
	};
});
