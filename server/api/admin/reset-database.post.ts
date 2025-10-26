import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Deletar todos os dados em ordem correta (respeitando foreign keys)
    
    // 1. Deletar imagens
    await prisma.image.deleteMany({})
    
    // 2. Deletar características das propriedades
    await prisma.propertyFeature.deleteMany({})
    
    // 3. Deletar contatos
    await prisma.contact.deleteMany({})
    
    // 4. Deletar propriedades
    await prisma.property.deleteMany({})
    
    // 5. Deletar agentes
    await prisma.agent.deleteMany({})
    
    // 6. Deletar usuários
    await prisma.user.deleteMany({})
    
    // 7. Deletar configurações do site
    await prisma.siteConfig.deleteMany({})

    return {
      success: true,
      message: 'Banco de dados zerado com sucesso'
    }
  } catch (error) {
    console.error('Erro ao zerar banco:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao zerar banco de dados'
    })
  }
})
