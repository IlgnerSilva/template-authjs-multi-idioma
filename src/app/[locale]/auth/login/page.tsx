import { LoginForm } from '@/components/auth/login-form'
import { SwitcherLocale } from '@/components/utils/switcher-locale'

export default function Page() {
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<LoginForm />
		</div>
	)
}
