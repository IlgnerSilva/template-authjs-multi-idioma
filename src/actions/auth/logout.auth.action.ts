'use server';

import { signOut } from '@/_auth';

export async function logoutAuthAction() {
	await signOut();
}
