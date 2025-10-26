import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID da propriedade é obrigatório'
    })
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        features: true,
        agent: true,
        contacts: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Propriedade não encontrada'
      })
    }

    return {
      success: true,
      data: property
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar propriedade'
    })
  }
})
