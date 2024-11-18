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

const formSchema = z.object({
	email: z.string().email({ message: 'E-mail is invalid' }),
	password: z.string().min(1, { message: 'Password is required' }),
})

async function onSubmit(values: z.infer<typeof formSchema>) {
	console.log(await loginCredentials(values))
}

export function LoginForm() {
	const t = useTranslations('Login')
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
				<CardDescription>{t('title')}</CardDescription>
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
											<FormLabel className="text-slate-800">E-mail</FormLabel>
											<FormControl>
												<Input placeholder="email@example.com" {...field} />
											</FormControl>
											<FormDescription>
												<FormMessage />
											</FormDescription>
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-slate-800">Password</FormLabel>
											<FormControl>
												<Input placeholder="Password..." {...field} />
											</FormControl>
											<FormDescription>
												<FormMessage />
											</FormDescription>
										</FormItem>
									)}
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
					</Form>

					<GoogleProvider />
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href="#" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
