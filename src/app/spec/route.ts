import { router } from '@/lib/orpc/router';
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod';

const openAPIGenerator = new OpenAPIGenerator({
	schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function GET(request: Request) {
	const spec = await openAPIGenerator.generate(router, {
		info: {
			title: 'ORPC Playground',
			version: '1.0.0',
		},
		servers: [{ url: '/api' /** Should use absolute URLs in production */ }],
		security: [{ bearerAuth: [] }],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
				},
			},
		},
	});

	return new Response(JSON.stringify(spec), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
