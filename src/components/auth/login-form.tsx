'use client'

import { loginCredentials } from '@/actions/auth/login'
import { GoogleProvider } from '@/components/auth/providers'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SwitcherLocale } from '@/components/utils/switcher-locale'
import { CredentialsSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

export function LoginForm() {
	const [isPending, startTransition] = useTransition()
	const [showOTP, setShowOTP] = useState(false)
	const [err, setErr] = useState<string | null>(null)
	const p = useTranslations('Pages')
	const c = useTranslations('Components')

	function onSubmit(values: z.infer<typeof CredentialsSchema>) {
		startTransition(() => {
			;(async () => {
				const result = await loginCredentials(values)
				if (!result) {
					return
				}

				if (result.type !== 'twoFactorAuthentication') {
					result.erro && setErr(result.message)
					return
				}
				setShowOTP(true)
				setErr(null)
			})()
		})
	}

	const form = useForm<z.infer<typeof CredentialsSchema>>({
		resolver: zodResolver(CredentialsSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle className="text-2xl">Login</CardTitle>
					<SwitcherLocale />
				</div>
				<CardDescription>
					{!showOTP && p('Login.titleCredentials')}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							{!showOTP && (
								<>
									<div className="grid gap-2">
										<FormField
											name="email"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormDescription>
														<FormMessage />
													</FormDescription>
													<FormControl>
														<Input
															placeholder={c('Input.email.placeholder')}
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-2 mt-5">
										<FormField
											name="password"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormDescription>
														<FormMessage />
													</FormDescription>
													<FormControl>
														<Input
															type="password"
															placeholder={c('Input.password.placeholder')}
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</>
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
							{err && <p className="text-red-500">{err}</p>}
							<Button
								disabled={isPending}
								type="submit"
								className="w-full mt-5"
							>
								{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{' '}
								{c('Button.login.default')}
							</Button>
						</form>
					</Form>

					<GoogleProvider text={c('Button.login.google')} />
				</div>
			</CardContent>
		</Card>
	)
}
