type GlobalMessages = typeof import('./src/dictionary/pt-br.json');
type ZodMessages = typeof import('./src/dictionary/zod/pt-br.json');
type Messages = GlobalMessages & ZodMessages;
declare interface IntlMessages extends Messages {}
