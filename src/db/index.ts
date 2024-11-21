import { env } from '@/env'
import { drizzle } from 'drizzle-orm/mysql2'

if (!env.DATABASE_URL) throw new Error('DATABASE_URL must be defined')
export const db = drizzle(env.DATABASE_URL)
