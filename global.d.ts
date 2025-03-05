import type pt from './dictionary/pt-br.json';

type Messages = typeof pt;

declare global {
	// Use type safe message keys with `next-intl`
	interface IntlMessages extends Messages {}
}
