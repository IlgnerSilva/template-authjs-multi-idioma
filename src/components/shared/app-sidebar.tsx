'use client';

import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { GalleryVerticalEnd, Ribbon } from 'lucide-react';
import { TeamSwitcher } from './team-switcher.shared.component';

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
