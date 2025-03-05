'use server';

import { auth } from '@/auth';
import { cookies } from 'next/headers';

export const handleTeste = async () => {
	const session = await auth();

	console.log(session);
	if (session?.user.user_id) {
		session.user.user_id = '123456789';
	}

	console.log(session);
};
