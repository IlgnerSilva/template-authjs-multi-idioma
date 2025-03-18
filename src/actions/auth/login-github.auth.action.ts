import { signIn } from '@/auth';

export const loginGithub = async () => await signIn('github');
