import { LoginForm } from '@/app/[locale]/auth/login/(_components)/login-form'

export default function Page() {
	return (
		<div className="bg-cover w-full h-screen min-h-screen bg-[url('https://images.unsplash.com/photo-1501959181532-7d2a3c064642?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
			<div className="h-screen bg-sky-900/50 flex items-center justify-center">
				<LoginForm />
			</div>
		</div>
	)
}
