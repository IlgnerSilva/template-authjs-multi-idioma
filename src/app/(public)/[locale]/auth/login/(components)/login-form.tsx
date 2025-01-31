'use client';

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
import env from '@/env/client';
import { ERROR_TYPES } from '@/lib/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { loginCredentials } from '../(actions)/login';
import { AuthProviders } from './providers';

export function LoginForm() {
	const [showOTP, setShowOTP] = useState(false);
	const [erro, setErro] = useState<string | null>(null);
	const p = useTranslations('Pages');
	const c = useTranslations('Components');
	const erros = useTranslations('ErrorsType');
	const { isPending, execute } = useServerAction(loginCredentials);

	const CredentialsSchema = z.object({
		email: z.string().email(p('Login.messages.error.email')),
		password: z.string({
			message: p('Login.messages.error.password.error'),
			required_error: p('Login.messages.error.password.required'),
		}),
		code: z.optional(z.string()),
	});

	async function onSubmit(values: z.infer<typeof CredentialsSchema>) {
		const [data, err] = await execute(values);
		if (data?.type !== ERROR_TYPES.TWO_FACTOR_REQUIRED) {
			switch (data?.type) {
				case ERROR_TYPES.INVALID_EMAIL_OR_PASSWORD:
					setErro(erros('INVALID_EMAIL_OR_PASSWORD'));
					break;
				case ERROR_TYPES.INVALID_CODE:
					setErro(erros('INVALID_CODE'));
					break;
				case ERROR_TYPES.USER_NOT_FOUND:
					setErro(erros('USER_NOT_FOUND'));
					break;
			}
			return;
		}
		setShowOTP(true);
		setErro(null);
	}

	const form = useForm<z.infer<typeof CredentialsSchema>>({
		resolver: zodResolver(CredentialsSchema),
		defaultValues: {
			email: 'sentinex.developer@gmail.com',
			password: '12345678',
			code: '',
		},
	});

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
												<AuthProviders
													textOverrides={{
														google: `${c('Button.login.google')} `,
														github: `${c('Button.login.github')} `,
													}}
												/>
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
															<FormMessage />
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
															<FormMessage />
														</FormDescription>
													</FormItem>
												)}
											/>
										</div>
									</div>
								)}
								{showOTP && (
									<AnimatePresence>
										<motion.div
											key="otp"
											initial={{ opacity: 0, scale: 0 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.4,
												scale: {
													type: 'spring',
													visualDuration: 0.4,
													bounce: 0.5,
												},
											}}
										>
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
										</motion.div>
									</AnimatePresence>
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
			<SwitcherLocale />
		</div>
	);
}
