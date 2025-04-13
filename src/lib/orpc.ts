import type { router } from '@/router';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createORPCReactQueryUtils } from '@orpc/react-query';
import type { RouterClient } from '@orpc/server';

const rpcLink = new RPCLink({
	url: new URL(
		'/rpc',
		typeof window !== 'undefined'
			? window.location.href
			: 'https://3000-idx-template-authjs-multi-idiomagit-1742833803590.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev/',
	),
	headers: () => ({
		Authorization: 'Bearer default-token',
	}),
});

export const orpcClient: RouterClient<typeof router> =
	createORPCClient(rpcLink);

export const orpc = createORPCReactQueryUtils(orpcClient);
