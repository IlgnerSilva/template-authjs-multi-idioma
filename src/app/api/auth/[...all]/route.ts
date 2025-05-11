import { auth } from '@/lib/better-auth/auth'; // path to your auth file
import { toNextJsHandler } from 'better-auth/next-js';

export const { POST, GET } = toNextJsHandler(auth.handler);
