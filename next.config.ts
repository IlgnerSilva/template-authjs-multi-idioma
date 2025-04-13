import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    allowedDevOrigins: ['3000-idx-template-authjs-multi-idiomagit-1742833803590.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev'],
    experimental: {
        nodeMiddleware: true,
    }
} as NextConfig;

export default withNextIntl(nextConfig);
