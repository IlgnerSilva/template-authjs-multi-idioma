'use client';

import { loginCredentialsAuthAction } from '@/actions/auth/login-credentials.auth.action';
import { Button } from '@/components/shared/button';
import { Input, InputGroup } from '@/components/shared/input';
import { SwitcherLocale } from '@/components/shared/switcher-locale';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useResponseHandler } from '@/lib/api-response';
import { useI18nZodErrors } from '@/lib/useI18nZodErrors';
import { CredentialSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from '@orpc/react/hooks';
import { KeyRound, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import type { z } from 'zod';
import { env } from '../../../../../../../env/client';
import { useRouter } from 'next/navigation';
import { orpcClient } from "@/lib/orpc"
export function LoginForm() {
	const route = useRouter();
	const [showOTP, setShowOTP] = useState(false);
	const [erro, setErro] = useState<string | null>(null);
	const p = useTranslations('Pages');
	const c = useTranslations('Components');

	const { handleApiResponse } = useResponseHandler();
	const { isPending, execute } = useServerAction(loginCredentialsAuthAction);

	useI18nZodErrors();
	const form = useForm<z.infer<typeof CredentialSchema>>({
		resolver: zodResolver(CredentialSchema),
		defaultValues: {
			email: 'ilgnersilva@outlook.com',
			password: '12345678',
			code: '',
		},
	});

	async function onSubmit(values: z.infer<typeof CredentialSchema>) {
		const { email, password } = values;
		const response = await orpcClient.auth.signin({
			email,
			password
		})
		console.log(response)

		//const {data, error} = await execute(values);
		//console.log(data)

		// if (data?.data)
		// 	route.push(data.data.url ?? '/')

		//handleApiResponse(error?.message)
	}

	return (
		<div className="w-80">
			<Card className="mx-auto max-w-80 border-0  flex flex-col gap-5">
				<CardHeader className="gap-8 pb-0">
					<div className="flex flex-col">
						<CardTitle className="text-5xl font-semibold text-neutral-base-800">
							Sign in
						</CardTitle>
					</div>
					{!showOTP && (
						<div>
							{env.NEXT_PUBLIC_ENABLED_PROVIDERS && (
								<>
									<CardDescription className="text-gray-base font-medium">
										<div className="flex flex-col gap-3">
											<span className="font-bold text-neutral-base-800">
												{!showOTP && p('Login.titleOauth')}
											</span>
											<div className="flex gap-2">
												{/* <AuthProviders
													textOverrides={{
														google: `${c('Button.login.google')} `,
														github: `${c('Button.login.github')} `,
													}}
												/> */}
											</div>
										</div>
									</CardDescription>
									<hr className="border-0 h-[2px] bg-neutral-base-200 rounded-full" />
								</>
							)}
						</div>
					)}
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								{!showOTP && (
									<div>
										<div className="grid gap-2 mb-2">
											<span className="font-bold text-neutral-base-800 text-[14px]">
												{!showOTP && p('Login.titleCredentials')}
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
								)}
								{showOTP && (
									<div>
										<FormField
											control={form.control}
											name="code"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{p('Login.titleOTP')}</FormLabel>
													<FormControl className="justify-center">
														<InputOTP
															className="justify-center"
															maxLength={6}
															{...field}
														>
															<InputOTPGroup>
																<InputOTPSlot index={0} />
																<InputOTPSlot index={1} />
																<InputOTPSlot index={2} />
															</InputOTPGroup>
															<InputOTPGroup>
																<InputOTPSlot index={3} />
																<InputOTPSlot index={4} />
																<InputOTPSlot index={5} />
															</InputOTPGroup>
														</InputOTP>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}
								{erro && (
									<FormDescription>
										<p className="text-primary-red">{erro}</p>
									</FormDescription>
								)}
								<div className="mt-5">
									<Button isLoading={isPending} type="submit" variant="primary">
										<Button.Title>{c('Button.login.default')}</Button.Title>
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</CardContent>
			</Card>
			<Toaster position="top-center" richColors />
			<SwitcherLocale />
		</div>
	);
}
