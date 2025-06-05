'use client';

import { useI18nZodErrors } from '@/lib/zod/useI18nZodErrors';
import { Button } from '@/presentation/components/shared/button';
import { Input, InputGroup } from '@/presentation/components/shared/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/presentation/components/ui/form';
import { type BASE_ERROR_CODES, useApiErrorHandler } from '@/presentation/hooks/errorHandler';
import { signinEmailAndPasswordSchema } from '@/lib/zod/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useServerAction } from '@orpc/react/hooks'
import { signin } from '@/lib/orpc/router/auth/signin'
import { onError, onSuccess } from '@orpc/client'

export function LoginForm() {
	const router = useRouter();
	const { showErrorToast } = useApiErrorHandler();
	const p = useTranslations('Pages');
	const c = useTranslations('Components');
	const { execute, isPending } = useServerAction(signin, {
		interceptors: [
			onError(erro => {
				if('data' in erro){
					showErrorToast((erro.data as { code: keyof typeof BASE_ERROR_CODES }).code);
				}
			}),
			onSuccess(result => {
				if('token' in result)
					router.push('/')	
			}),
		]
	})

	useI18nZodErrors();
	const form = useForm<z.infer<typeof signinEmailAndPasswordSchema>>({
		resolver: zodResolver(signinEmailAndPasswordSchema),
		defaultValues: {
			email: 'ilgnersilva@outlook.com',
			password: '12345678',
		},
	});

	async function onSubmit(
		values: z.infer<typeof signinEmailAndPasswordSchema>,
	) {
		await execute(values)
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
