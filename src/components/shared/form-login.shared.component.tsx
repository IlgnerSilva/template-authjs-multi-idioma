'use client';

import { Button } from '@/components/shared/button';
import { Input, InputGroup } from '@/components/shared/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useI18nZodErrors } from '@/lib/useI18nZodErrors';
import { SigninEmailAndPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useRouter } from 'next/navigation';
import { orpcClient } from '@/lib/orpc';
import { useTransition } from 'react';
import { useApiErrorHandler } from '@/hooks/errorHandler';

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

	async function onSubmit(values: z.infer<typeof SigninEmailAndPasswordSchema>) {
		const { email, password } = values;
		
		startTransition(async () => {
		  try {
			const response = await orpcClient.auth.signin({
			  email,
			  password,
			});
			
			// Verificar se é um redirecionamento para autenticação de dois fatores
			if ('twoFactorRedirect' in response && response.twoFactorRedirect === true) {
			  // Redirecionar para página de autenticação 2FA
			  router.push("/auth/verify/totp");
			  return;
			}
			
			// Verificar se é uma resposta de erro
			if ('defined' in response && response.defined === false) {
			  // Tratar erro de autenticação
			  showErrorToast(response.data.code) 
			  return;
			}
			
			// Se chegou aqui, é uma resposta bem-sucedida (ResponseDTO)
			if ('token' in response && 'user' in response) {
				router.push("/");
			  return;
			}
			
		  } catch (err) {
			console.error("Erro ao fazer login:", err);
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
