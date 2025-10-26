import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    const properties = await prisma.property.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        features: true,
        agent: true,
        _count: {
          select: { contacts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      data: properties
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar propriedades'
    })
  }
})
