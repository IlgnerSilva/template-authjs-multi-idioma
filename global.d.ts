import type pt from './dictionary/pt-BR.json'

type Messages = typeof pt

declare global {
	// Use type safe message keys with `next-intl`
	interface IntlMessages extends Messages {}
}
