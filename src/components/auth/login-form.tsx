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
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAction } from "next-safe-action/hooks";
import { useState, useTransition } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

export function LoginForm() {
	const [ isPending, startTransition] = useTransition();
	const [showOTP, setShowOTP] = useState(false)
	const p = useTranslations('Pages')
	const c = useTranslations('Components')
	const { execute,  result, status, isExecuting  } = useAction(loginCredentials); 

	const formSchema = z.object({
		email: z.string().email({ message: p('Login.messages.error.email') }),
		password: z
			.string()
			.min(1, { message: p('Login.messages.error.password') }),
		code: z.string().optional()
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		execute(values)
		startTransition(() => {
			if(result.data?.type === "twoFactorAuthentication")
				setShowOTP(true)
		})
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			code: ''
		},
	})

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle className="text-2xl">Login</CardTitle>
					<SwitcherLocale />
				</div>
				<CardDescription>{!showOTP ? p('Login.titleCredentials') : p('Login.titleOTP')}</CardDescription>
				
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
												{/* <FormLabel className="text-slate-800">
													{c('Input.email.label')}
												</FormLabel> */}
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
												{/* <FormLabel className="text-slate-800">
													{c('Input.password.label')}
												</FormLabel> */}
												<FormDescription>
													<FormMessage />
												</FormDescription>
												<FormControl>
													<Input
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
											<FormLabel>{"Código"}</FormLabel>
											<FormControl>
												<InputOTP maxLength={6} {...field}>
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
											<FormDescription>{"Favor entrar com o códio enviado por e-mail"}</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
							<p id='message'>{isExecuting ? 'Entrando...' : 'TESTE' }</p>
							<Button disabled={isPending} type="submit" className="w-full mt-5">
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
