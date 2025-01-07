import { logout } from '@/app/[locale]/auth/login/(actions)/logout';
import { auth } from '@/auth';

export default async function Page() {
	const session = await auth();
	return (
		<>
			<button onClick={logout} type="submit">
				Logout
			</button>

			<div className="flex h-screen w-full items-center justify-center px-4">
				<h1>Foi</h1>
			</div>
		</>
	);
}
