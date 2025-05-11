import { routing } from '@/lib/i18n/routing';
import { AppSidebar } from '@/presentation/components/shared/app-sidebar';
import { Separator } from '@/presentation/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/presentation/components/ui/sidebar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
	children,
	params,
}: { children: React.ReactNode; params: Params }) {
	const { locale } = await params;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}
	const dictionary = await getMessages();
	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={dictionary}>
					<SidebarProvider>
						<AppSidebar />
						<SidebarInset>
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
								<div className="flex items-center gap-2 px-4">
									<SidebarTrigger className="-ml-1" />
									<Separator orientation="vertical" className="mr-2 h-4" />
								</div>
							</header>
							<div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-neutral-base-300">
								{children}
							</div>
						</SidebarInset>
					</SidebarProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
