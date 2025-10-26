import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    const where: any = {}
    
    // Aplicar filtros
    if (query.status) {
      where.status = query.status
    }
    
    if (query.propertyId) {
      where.propertyId = parseInt(query.propertyId as string)
    }
    
    if (query.read !== undefined) {
      where.read = query.read === 'true'
    }

    const contacts = await prisma.contact.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            price: true,
            location: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      data: contacts
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar contatos'
    })
  }
})
