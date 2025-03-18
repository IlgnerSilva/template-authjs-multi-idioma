type GlobalMessages = typeof import('./dictionary/pt-br.json');
type ZodMessages = typeof import('./dictionary/zod/pt-br.json');
type Messages = GlobalMessages & ZodMessages;
declare interface IntlMessages extends Messages {}
