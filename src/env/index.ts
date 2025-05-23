
// src/env/server.ts - Versão com debug detalhado
import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET é obrigatório'),
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL deve ser uma URL válida'),
  HOST: z.string().url('HOST deve ser uma URL válida'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatório'),
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY é obrigatório'),
  RESEND_FROM_EMAIL: z.string().email('RESEND_FROM_EMAIL deve ser um email válido').optional(),
});

// Debug: Mostrar quais variáveis estão sendo lidas
console.log('=== DEBUG VARIÁVEIS DE AMBIENTE ===');
console.log('BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? '✅ Definida' : '❌ Não definida');
console.log('BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL || '❌ Não definida');
console.log('HOST:', process.env.HOST || '❌ Não definida');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Definida' : '❌ Não definida');
console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || '❌ Não definida (opcional)');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('=====================================');

// Fazer o parse e capturar erros específicos
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Erro na validação das variáveis de ambiente:');
  console.error(JSON.stringify(result.error.format(), null, 2));
  
  // Mostrar erros específicos por campo
  // biome-ignore lint/complexity/noForEach: <explanation>
      result.error.issues.forEach((issue) => {
    console.error(`❌ ${issue.path.join('.')}: ${issue.message}`);
  });
  
  throw new Error('Invalid environment variables. Verifique os logs acima para detalhes.');
}

console.log('✅ Todas as variáveis de ambiente são válidas');

export const env = result.data;