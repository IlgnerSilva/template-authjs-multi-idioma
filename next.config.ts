import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
const nextConfig = {reactStrictMode: false} as NextConfig

export default withNextIntl(nextConfig)
