FROM node:22.11.0

WORKDIR /user/app

# Copia os arquivos package*.json e instala as dependências
COPY package*.json ./
RUN npm install -g pnpm && pnpm store prune && pnpm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expondo a porta 3000 para o Next.js
EXPOSE 3000

# Executa o build
RUN pnpm run build

# Inicia o Next.js no modo de produção
CMD ["pnpm", "run", "start"]
