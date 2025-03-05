'use client';

import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { TeamSwitcher } from './team-switch/team-switcher.shared.component';
import { GalleryVerticalEnd, Ribbon } from 'lucide-react';

export function AppSidebar() {
	const organizations = {
		teams: [
			{
				name: 'Acme Inc TESTE',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise',
			},
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
		</Sidebar>
	);
}
