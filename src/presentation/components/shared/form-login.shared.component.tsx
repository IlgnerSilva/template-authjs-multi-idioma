'use client';

import { orpcClient } from '@/lib/orpc/orpc-client';
import { useI18nZodErrors } from '@/lib/zod/useI18nZodErrors';
import { Button } from '@/presentation/components/shared/button';
import { Input, InputGroup } from '@/presentation/components/shared/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/presentation/components/ui/form';
import { useApiErrorHandler } from '@/presentation/hooks/errorHandler';
import { SigninEmailAndPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ORPCError, safe } from '@orpc/client';
import { KeyRound, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export function LoginForm() {
	const router = useRouter();
	const { showErrorToast } = useApiErrorHandler();
	const [isPending, startTransition] = useTransition();
	const p = useTranslations('Pages');
	const c = useTranslations('Components');

	useI18nZodErrors();
	const form = useForm<z.infer<typeof SigninEmailAndPasswordSchema>>({
		resolver: zodResolver(SigninEmailAndPasswordSchema),
		defaultValues: {
			email: 'ilgnersilva@outlook.com',
			password: '12345678',
		},
	});

	async function onSubmit(
		values: z.infer<typeof SigninEmailAndPasswordSchema>,
	) {
		startTransition(async () => {
			const { email, password } = values;
			const { error, data } = await safe(
				orpcClient.auth.signin({ email, password }),
			);

			if (error instanceof ORPCError) {
				showErrorToast(error.data.code);
			}

			if (data) {
				if ('twoFactorRedirect' in data && data.twoFactorRedirect === true) {
					router.push('/auth/verify/totp');
					return;
				}

				if ('token' in data && 'user' in data) {
					router.push('/');
					return;
				}
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<div className="grid gap-2 mb-2">
						<span className="font-bold text-neutral-base-800 text-[14px]">
							{p('Login.titleCredentials')}
						</span>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<InputGroup>
											<Mail className="text-neutral-base-500" />
											<Input
												className="ring-0"
												autoComplete="off"
												placeholder={c('Input.email.placeholder')}
												{...field}
											/>
										</InputGroup>
									</FormControl>
									<FormDescription>
										<FormMessage className="my-1 pl-3" />
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-2 mb-2">
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<InputGroup>
											<KeyRound className="text-neutral-base-500" />
											<Input
												type="password"
												placeholder={c('Input.password.placeholder')}
												{...field}
											/>
										</InputGroup>
									</FormControl>
									<FormDescription>
										<FormMessage className="my-1 pl-3" />
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="mt-5">
					<Button isLoading={isPending} type="submit" variant="primary">
						<Button.Title>{c('Button.login.default')}</Button.Title>
					</Button>
				</div>
			</form>
		</Form>
	);
}
