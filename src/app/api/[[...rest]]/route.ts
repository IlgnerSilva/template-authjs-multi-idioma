import { router } from '@/lib/orpc/router';
import { OpenAPIHandler } from '@orpc/openapi/next';
import { onError } from '@orpc/server';
import { serve } from '@orpc/server/next';
import { ZodSmartCoercionPlugin } from '@orpc/zod';
import '@/polyfill';

const openAPIHandler = new OpenAPIHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
	plugins: [new ZodSmartCoercionPlugin()],
});

export const { GET, POST, PUT, PATCH, DELETE } = serve(openAPIHandler, {
	prefix: '/api',
	context: async (req) => {
		return {};
	},
});
