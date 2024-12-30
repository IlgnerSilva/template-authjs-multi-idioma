import { loginGoogle } from '@/app/[locale]/auth/login/(actions)/login';
import { Button } from '@/components/shared/button';
import { Google } from '@/components/shared/icons';
// import { env } from '@/env'
export function GoogleProvider(props: { text: string }) {
	if (process.env.NEXT_PUBLIC_AUTH_GOOGLE_PROVIDER === 'true')
		return (
			<form className="w-full" onSubmit={async () => await loginGoogle()}>
				<Button
					type="submit"
					className="bg-neutral-base-100 ring-2 ring-neutral-base-200"
				>
					<Button.Icon>
						<Google />
					</Button.Icon>
					<Button.Title className="font-bold text-sm">
						{props.text}
					</Button.Title>
				</Button>
			</form>
		);

	return '';
}
