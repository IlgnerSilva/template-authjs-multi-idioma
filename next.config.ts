import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
const nextConfig = {} as NextConfig

export default withNextIntl(nextConfig)
