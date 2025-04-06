import { router } from '@/router';
import { onError } from '@orpc/server';
import { RPCHandler, serve } from '@orpc/server/next';
import '@/polyfill';

const rpcHandler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const { GET, POST, PUT, PATCH, DELETE } = serve(rpcHandler, {
	prefix: '/rpc',
	context: async (req) => {
		return {};
	},
});
