import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FormLoginTOTP } from '@/components/shared/form-login-totp.shared.component';
import { SwitcherLocale } from '@/components/shared/switcher-locale';
import { Toaster } from 'sonner';
import { useTranslations } from 'next-intl';

export default function Page() {
	return (
		<div className="w-full h-screen min-h-screen relative">
			<div className="h-screen flex items-center justify-center">
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<div className="bg-neutral-base-600 min-h-screen w-full max-w-sm hidden sm:block"></div>
				<div className="w-full flex justify-center">
					<div className="w-80">
						<Card className="mx-auto max-w-80 border-0  flex flex-col gap-5">
							<CardHeader className="gap-8 pb-0">
								<div className="flex flex-col">
									<CardTitle className="text-5xl font-semibold text-neutral-base-800">
										Verify TOTP
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<FormLoginTOTP />
								</div>
							</CardContent>
						</Card>
						<Toaster position="top-center" richColors />
						<SwitcherLocale />
					</div>
				</div>
			</div>
		</div>
	);
}
