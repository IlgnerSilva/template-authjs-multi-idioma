import { signIn } from '@/_auth';

export const loginGoogle = async () => await signIn('google');
