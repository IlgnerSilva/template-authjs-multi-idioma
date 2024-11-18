import { loginGoogle } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
// import { env } from '@/env'
export function GoogleProvider() {
	if (process.env.NEXT_PUBLIC_AUTH_GOOGLE_PROVIDER === 'true')
		return (
			<form action={async () => await loginGoogle()}>
				<Button type="submit" variant="outline" className="w-full">
					Login with Google
				</Button>
			</form>
		)

	return ''
}
