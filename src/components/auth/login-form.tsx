'use client'

import Link from 'next/link'

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
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function LoginForm() {
	const p = useTranslations('Pages')
	const c = useTranslations('Components')

	const formSchema = z.object({
		email: z.string().email({ message: p('Login.messages.error.email') }),
		password: z
			.string()
			.min(1, { message: p('Login.messages.error.password') }),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(await loginCredentials(values))
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>{p('Login.title')}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
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
							<Button type="submit" className="w-full mt-5">
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
