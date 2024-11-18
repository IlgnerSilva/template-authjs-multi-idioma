import { env } from '@/env'
import { drizzle } from 'drizzle-orm/mysql2'
export const db = drizzle(env.DATABASE_URL)
