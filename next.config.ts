import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { env } from '@/env/server'
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
console.log(env.HOST)
const nextConfig = {
	allowedDevOrigins: [env.HOST],
	experimental: {
		nodeMiddleware: true,
	},
} as NextConfig;

export default withNextIntl(nextConfig);
