'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/presentation/components/ui/sidebar';
import { GalleryVerticalEnd, Ribbon } from 'lucide-react';
import { Profile } from './profile.shared.component';
import { TeamSwitcher } from './team-switcher.shared.component';

export function AppSidebar() {
	const organizations = {
		teams: [
			{
				name: 'Acme Inc',
				logo: Ribbon,
				plan: 'Enterprise',
			},
		],
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<TeamSwitcher teams={organizations.teams} />
			</SidebarHeader>
			<SidebarContent />
			<SidebarFooter>
				<Profile />
			</SidebarFooter>
		</Sidebar>
	);
}
