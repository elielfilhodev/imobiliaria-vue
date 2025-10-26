import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    const where: any = {}
    
    // Aplicar filtros
    if (query.propertyId) {
      where.propertyId = parseInt(query.propertyId as string)
    }
    
    if (query.type) {
      where.type = query.type
    }

    const images = await prisma.image.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      data: images
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar imagens'
    })
  }
})
