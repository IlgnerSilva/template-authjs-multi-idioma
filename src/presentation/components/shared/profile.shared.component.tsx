'use client';

import { orpcClient } from '@/lib/orpc/orpc-client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/presentation/components/ui/sidebar';
import { useApiErrorHandler } from '@/presentation/hooks/errorHandler';
import { safe } from '@orpc/client';
import { ORPCError } from '@orpc/client';
import { User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function Profile() {
	const [isPending, startTransition] = useTransition();
	const { showErrorToast } = useApiErrorHandler();
	const router = useRouter();
	const handleSignout = () => {
		startTransition(async () => {
			const { error, data } = await safe(orpcClient.auth.signout());
			if (error instanceof ORPCError) {
				showErrorToast(error.data.code);
			}

			if (data?.success) router.push('/');
		});
	};
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="mx-auto flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<User2 className="size-4" />
								{/* <activeTeam.logo className="size-4" /> */}
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side="right"
						className="w-[--radix-popper-anchor-width] bg-neutral-base-100"
					>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							<span>Account</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							<span>Billing</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button onClick={handleSignout}>Sign out</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
