import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Criar um agente padrão para testes
    const agent = await prisma.agent.create({
      data: {
        name: 'Agente Padrão',
        email: 'agente@imobiliaria.com',
        phone: '(11) 99999-9999',
        creci: '00000',
        bio: 'Agente padrão para testes',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        active: true
      }
    })

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@imobiliaria.com',
        password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJapJj3p8p8p8p8p8p8', // password: admin123
        name: 'Administrador',
        role: 'ADMIN',
        active: true
      }
    })

    // Criar configurações básicas do site
    const configs = await prisma.siteConfig.createMany({
      data: [
        { key: 'site_name', value: 'Imobiliária Genérica', description: 'Nome do site' },
        { key: 'site_description', value: 'Encontre o imóvel dos seus sonhos', description: 'Descrição do site' },
        { key: 'contact_email', value: 'contato@imobiliaria.com', description: 'Email de contato' },
        { key: 'contact_phone', value: '(11) 3333-4444', description: 'Telefone de contato' }
      ]
    })

    return {
      success: true,
      message: 'Dados básicos criados com sucesso',
      data: {
        agent,
        admin,
        configs
      }
    }
  } catch (error) {
    console.error('Erro ao criar dados básicos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar dados básicos'
    })
  }
})
