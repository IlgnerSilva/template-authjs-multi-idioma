import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { env } from '@/env'
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
const nextConfig = {
	// Configuração para origens permitidas em desenvolvimento
	allowedDevOrigins: [env.HOST],
	
	experimental: {
		nodeMiddleware: true
	}
} as NextConfig;

export default withNextIntl(nextConfig);
