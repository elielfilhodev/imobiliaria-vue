# PowerShell script para configurar banco de dados Neon
# Execute como: .\setup-neon.ps1

Write-Host "🚀 Configurando banco de dados Neon para Imobiliária Genérica" -ForegroundColor Green
Write-Host "==============================================================" -ForegroundColor Green

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não está instalado. Por favor, instale o Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o npm está instalado
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não está instalado." -ForegroundColor Red
    exit 1
}

# Copiar arquivo de configuração
if (Test-Path "env.neon") {
    Write-Host "📋 Copiando configurações do Neon..." -ForegroundColor Yellow
    Copy-Item "env.neon" ".env"
    Write-Host "✅ Arquivo .env criado com as configurações do Neon" -ForegroundColor Green
} else {
    Write-Host "❌ Arquivo env.neon não encontrado!" -ForegroundColor Red
    exit 1
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
$installResult = npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# Gerar cliente Prisma
Write-Host "🔧 Gerando cliente Prisma..." -ForegroundColor Yellow
$generateResult = npm run db:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cliente Prisma gerado com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao gerar cliente Prisma" -ForegroundColor Red
    exit 1
}

# Aplicar schema ao banco
Write-Host "🗄️ Aplicando schema ao banco de dados..." -ForegroundColor Yellow
$pushResult = npm run db:push
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema aplicado ao banco com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao aplicar schema ao banco" -ForegroundColor Red
    exit 1
}

# Popular banco com dados iniciais
Write-Host "🌱 Populando banco com dados iniciais..." -ForegroundColor Yellow
$seedResult = npm run db:seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Banco populado com dados iniciais" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao popular banco com dados iniciais" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Configuração concluída com sucesso!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento" -ForegroundColor White
Write-Host "2. Acesse http://localhost:3000 para ver o site" -ForegroundColor White
Write-Host "3. Acesse http://localhost:3000/admin para a área administrativa" -ForegroundColor White
Write-Host "4. Execute 'npm run db:studio' para abrir o Prisma Studio" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Credenciais do admin:" -ForegroundColor Cyan
Write-Host "Email: admin@imobiliaria.com" -ForegroundColor White
Write-Host "Senha: admin123" -ForegroundColor White
Write-Host ""
Write-Host "📊 Dados criados:" -ForegroundColor Cyan
Write-Host "- 3 agentes" -ForegroundColor White
Write-Host "- 5 propriedades" -ForegroundColor White
Write-Host "- Imagens e características" -ForegroundColor White
Write-Host "- 3 contatos de exemplo" -ForegroundColor White
Write-Host "- Configurações do site" -ForegroundColor White
Write-Host ""
Write-Host "✨ Tudo pronto para usar!" -ForegroundColor Green
