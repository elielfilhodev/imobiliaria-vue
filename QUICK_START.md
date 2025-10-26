# 🚀 Configuração Rápida - Imobiliária Genérica

## ⚡ Setup em 3 Passos

### 1. Configurar Banco de Dados
```bash
# Linux/Mac
chmod +x setup-neon.sh && ./setup-neon.sh

# Windows
.\setup-neon.ps1
```

### 2. Iniciar Aplicação
```bash
npm run dev
```

### 3. Acessar
- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Prisma Studio**: `npm run db:studio`

## 🔑 Login Admin
- **Email**: admin@imobiliaria.com
- **Senha**: admin123

## 📊 O que é criado automaticamente:
- ✅ 3 agentes
- ✅ 5 propriedades
- ✅ Imagens e características
- ✅ 3 contatos de exemplo
- ✅ Configurações do site

## 🛠️ Scripts Úteis
```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run db:studio    # Interface do banco
npm run db:seed      # Recriar dados
```

## 🆘 Problemas?
1. Verifique se o arquivo `.env` foi criado
2. Confirme se as dependências foram instaladas
3. Teste a conexão: `npm run db:studio`

---
**✨ Pronto para usar!**
