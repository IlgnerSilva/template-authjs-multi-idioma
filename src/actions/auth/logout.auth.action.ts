'use server';

import { signOut } from '@/auth';

export async function logoutAuthAction() {
	await signOut();
}
