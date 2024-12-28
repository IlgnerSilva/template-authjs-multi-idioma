'use client'

import { loginCredentials } from '../(actions)/login'
import { GoogleProvider } from './providers'
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
import { SwitcherLocale } from '@/components/shared/switcher-locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '../../../../../components/ui/input-otp'
import { Label } from '@/components/ui/label'



export function LoginForm() {
	const [isPending, startTransition] = useTransition()
	const [showOTP, setShowOTP] = useState(false)
	const [err, setErr] = useState<string | null>(null)
	const p = useTranslations('Pages')
	const c = useTranslations('Components')
	
	const CredentialsSchema = z.object({
		email: z.string().email(p('Login.messages.error.email')),
		password: z.string().min(6, p('Login.messages.error.password')),
		code: z.optional(z.string()),
	})
	
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
		<div className="w-96 mx-2">
			<div>
				<div className="mb-5">
					<h2 className="text-center font-bold text-gray-100">Sua Logo</h2>
				</div>
			</div>
			<Card className="mx-auto max-w-96">
				<CardHeader>
					<div className="flex justify-center">
						<CardTitle className="text-2xl">Sign in</CardTitle>
					</div>
					<CardDescription className="text-center text-gray-base font-medium">
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
														<Label className="text-xs text-gray-opacity">
															{c('Input.email.label')}
														</Label>
														<FormControl>
															<Input
																className="ring-0"
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
														<Label className="text-xs text-gray-opacity">
															{c('Input.password.label')}
														</Label>
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
									className="w-full mt-5 bg-primary hover:bg-primary/80"
								>
									{isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}{' '}
									{c('Button.login.default')}
								</Button>
							</form>
						</Form>

						<GoogleProvider text={c('Button.login.google')} />
					</div>
				</CardContent>
			</Card>
			<SwitcherLocale />
		</div>
	)
}
