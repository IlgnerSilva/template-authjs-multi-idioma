import type { router } from '@/lib/orpc/router';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createORPCReactQueryUtils } from '@orpc/react-query';
import type { RouterClient } from '@orpc/server';


const rpcLink = new RPCLink({
	url: new URL(`${process.env.NEXT_PUBLIC_HOST}/rpc`),
	headers: () => ({
		Authorization: 'Bearer default-token',
	}),
});

export const orpcClient: RouterClient<typeof router> =
	createORPCClient(rpcLink);

export const orpc = createORPCReactQueryUtils(orpcClient);
