'use client'

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useApiErrorHandler } from '@/hooks/errorHandler';
import { TotpSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from './button';
import { useTranslations } from 'next-intl';

export function FormLoginTOTP() {
	const route = useRouter();
	const { showErrorToast } = useApiErrorHandler();
	const [isPending, startTransition] = useTransition();
	const p = useTranslations('Pages');
	const c = useTranslations('Components');

	const form = useForm<z.infer<typeof TotpSchema>>({
		resolver: zodResolver(TotpSchema),
		defaultValues: {
			code: '',
		},
	});

	async function onSubmit(values: z.infer<typeof TotpSchema>) {}

	return (
		<Form {...form}>
			<form>
				<div>
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{p('Login.titleOTP')}</FormLabel>
								<FormControl className="justify-center">
									<InputOTP className="justify-center" maxLength={6} {...field}>
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
				<div className="mt-5">
					<Button isLoading={isPending} type="submit" variant="primary">
						<Button.Title>{c('Button.login.default')}</Button.Title>
					</Button>
				</div>
			</form>
		</Form>
	);
}
