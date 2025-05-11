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
	useSidebar,
} from '@/presentation/components/ui/sidebar';
import { ChevronUp, User2 } from 'lucide-react';

export function Profile() {
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
						side="top"
						className="w-[--radix-popper-anchor-width] bg-neutral-base-100"
					>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							<span>Account</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							<span>Billing</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-sidebar-accent">
							<span>Sign out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
