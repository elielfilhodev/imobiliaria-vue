import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID da propriedade é obrigatório'
    })
  }

  try {
    // Atualizar propriedade
    const property = await prisma.property.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
        price: parseInt(body.price),
        location: body.location,
        bedrooms: parseInt(body.bedrooms) || 0,
        bathrooms: parseInt(body.bathrooms) || 0,
        area: parseInt(body.area) || 0,
        parking: parseInt(body.parking) || 0,
        floor: body.floor ? parseInt(body.floor) : null,
        condoFee: body.condoFee ? parseInt(body.condoFee) : null,
        type: body.type,
        transaction: body.transaction,
        status: body.status,
        featured: body.featured || false,
        agentId: body.agentId ? parseInt(body.agentId) : null
      },
      include: {
        images: true,
        features: true,
        agent: true
      }
    })

    // Atualizar características se fornecidas
    if (body.features) {
      // Remover características existentes
      await prisma.propertyFeature.deleteMany({
        where: { propertyId: parseInt(id) }
      })

      // Criar novas características
      if (body.features.length > 0) {
        await prisma.propertyFeature.createMany({
          data: body.features.map((feature: string) => ({
            name: feature,
            propertyId: parseInt(id)
          }))
        })
      }
    }

    // Atualizar imagens se fornecidas
    if (body.images) {
      // Remover imagens existentes
      await prisma.image.deleteMany({
        where: { propertyId: parseInt(id) }
      })

      // Criar novas imagens
      if (body.images.length > 0) {
        await prisma.image.createMany({
          data: body.images.map((image: any, index: number) => ({
            url: image.url,
            alt: image.alt || '',
            type: image.type || 'GALLERY',
            order: index + 1,
            propertyId: parseInt(id)
          }))
        })
      }
    }

    return {
      success: true,
      data: property
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao atualizar propriedade'
    })
  }
})
