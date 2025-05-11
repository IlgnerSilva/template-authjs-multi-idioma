import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
	allowedDevOrigins: ['http://localhost:3000'],
	experimental: {
		nodeMiddleware: true,
	},
} as NextConfig;

export default withNextIntl(nextConfig);
