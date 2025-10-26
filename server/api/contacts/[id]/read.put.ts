import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do contato é obrigatório'
    })
  }

  try {
    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        read: true,
        status: 'READ'
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            price: true,
            location: true
          }
        }
      }
    })

    return {
      success: true,
      data: contact
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao marcar contato como lido'
    })
  }
})
