import { signIn } from '@/_auth';

export const loginGithub = async () => await signIn('github');
