import { LoginForm } from '@/app/[locale]/auth/login/(_components)/login-form';

export default function Page() {
	return (
		<div className="w-full h-screen min-h-screen relative">
			<div className="h-screen flex items-center justify-center">
				<div className="bg-neutral-300 min-h-screen w-full max-w-sm hidden sm:block"></div>
				<div className="w-full flex justify-center">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
