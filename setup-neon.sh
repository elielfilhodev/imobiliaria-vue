#!/bin/bash

echo "🚀 Configurando banco de dados Neon para Imobiliária Genérica"
echo "=============================================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"

# Copiar arquivo de configuração
if [ -f "env.neon" ]; then
    echo "📋 Copiando configurações do Neon..."
    cp env.neon .env
    echo "✅ Arquivo .env criado com as configurações do Neon"
else
    echo "❌ Arquivo env.neon não encontrado!"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Gerar cliente Prisma
echo "🔧 Gerando cliente Prisma..."
npm run db:generate

if [ $? -eq 0 ]; then
    echo "✅ Cliente Prisma gerado com sucesso"
else
    echo "❌ Erro ao gerar cliente Prisma"
    exit 1
fi

# Aplicar schema ao banco
echo "🗄️ Aplicando schema ao banco de dados..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Schema aplicado ao banco com sucesso"
else
    echo "❌ Erro ao aplicar schema ao banco"
    exit 1
fi

# Popular banco com dados iniciais
echo "🌱 Populando banco com dados iniciais..."
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Banco populado com dados iniciais"
else
    echo "❌ Erro ao popular banco com dados iniciais"
    exit 1
fi

echo ""
echo "🎉 Configuração concluída com sucesso!"
echo "======================================"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
echo "2. Acesse http://localhost:3000 para ver o site"
echo "3. Acesse http://localhost:3000/admin para a área administrativa"
echo "4. Execute 'npm run db:studio' para abrir o Prisma Studio"
echo ""
echo "🔑 Credenciais do admin:"
echo "Email: admin@imobiliaria.com"
echo "Senha: admin123"
echo ""
echo "📊 Dados criados:"
echo "- 3 agentes"
echo "- 5 propriedades"
echo "- Imagens e características"
echo "- 3 contatos de exemplo"
echo "- Configurações do site"
echo ""
echo "✨ Tudo pronto para usar!"
