# Configuração do Banco de Dados - Imobiliária Genérica

Este guia explica como configurar o banco de dados PostgreSQL com Prisma e Neon (Vercel) para o site da imobiliária.

## 🗄️ Pré-requisitos

- Node.js 18+ instalado
- Conta no Neon (Vercel) - [neon.tech](https://neon.tech)
- Git instalado

## 📋 Passo a Passo

### 1. Configurar Neon Database

1. **Criar conta no Neon:**
   - Acesse [neon.tech](https://neon.tech)
   - Crie uma conta gratuita
   - Crie um novo projeto

2. **Obter URL de conexão:**
   - No dashboard do Neon, copie a connection string
   - Formato: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require`

### 2. Configurar Variáveis de Ambiente

1. **Criar arquivo .env:**
```bash
cp env.example .env
```

2. **Configurar DATABASE_URL:**
```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/imobiliaria_db?sslmode=require"
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Prisma

1. **Gerar cliente Prisma:**
```bash
npm run db:generate
```

2. **Executar migrações:**
```bash
npm run db:push
```

3. **Popular banco com dados iniciais:**
```bash
npm run db:seed
```

### 5. Verificar Configuração

1. **Abrir Prisma Studio:**
```bash
npm run db:studio
```

2. **Testar aplicação:**
```bash
npm run dev
```

## 🏗️ Estrutura do Banco

### Tabelas Principais

- **properties** - Propriedades imobiliárias
- **images** - Imagens das propriedades
- **property_features** - Características das propriedades
- **contacts** - Contatos recebidos
- **agents** - Corretores
- **users** - Usuários do sistema
- **site_config** - Configurações do site

### Relacionamentos

- Uma propriedade pode ter várias imagens
- Uma propriedade pode ter várias características
- Uma propriedade pode ter vários contatos
- Uma propriedade pertence a um agente
- Um agente pode ter várias propriedades

## 🔧 Scripts Disponíveis

```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar mudanças no schema
npm run db:push

# Criar migração
npm run db:migrate

# Popular banco com dados iniciais
npm run db:seed

# Abrir Prisma Studio
npm run db:studio
```

## 📊 Dados Iniciais

O seed cria automaticamente:

- **3 agentes** com informações completas
- **5 propriedades** variadas (casas, apartamentos, cobertura)
- **Características** para cada propriedade
- **Imagens** para cada propriedade
- **3 contatos** de exemplo
- **Usuário admin** (email: admin@imobiliaria.com, senha: admin123)
- **Configurações** do site

## 🚀 API Endpoints

### Propriedades
- `GET /api/properties` - Listar propriedades
- `POST /api/properties` - Criar propriedade
- `GET /api/properties/[id]` - Buscar propriedade por ID
- `PUT /api/properties/[id]` - Atualizar propriedade
- `DELETE /api/properties/[id]` - Deletar propriedade

### Contatos
- `GET /api/contacts` - Listar contatos
- `POST /api/contacts` - Criar contato
- `PUT /api/contacts/[id]/read` - Marcar como lido

### Imagens
- `GET /api/images` - Listar imagens
- `POST /api/images` - Criar imagem

## 🔒 Segurança

- Todas as senhas são hasheadas com bcrypt
- Validação de dados em todas as rotas
- Sanitização de inputs
- Rate limiting (implementar futuramente)

## 📈 Monitoramento

- Logs de erro em todas as operações
- Métricas de performance
- Backup automático (configurar no Neon)

## 🆘 Troubleshooting

### Erro de Conexão
```bash
# Verificar se a DATABASE_URL está correta
echo $DATABASE_URL

# Testar conexão
npm run db:studio
```

### Erro de Migração
```bash
# Resetar banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Aplicar migrações novamente
npm run db:push
npm run db:seed
```

### Erro de Seed
```bash
# Verificar se o banco está vazio
npm run db:studio

# Executar seed novamente
npm run db:seed
```

## 📞 Suporte

Para problemas com o banco de dados:

1. Verificar logs do Neon
2. Consultar documentação do Prisma
3. Verificar variáveis de ambiente
4. Testar conexão localmente

---

**Importante:** Mantenha suas credenciais de banco seguras e nunca as commite no Git!
