import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
const nextConfig = {}

export default withNextIntl(nextConfig)
