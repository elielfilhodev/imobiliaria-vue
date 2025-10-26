import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const property = await prisma.property.create({
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
        status: body.status || 'AVAILABLE',
        featured: body.featured || false,
        agentId: body.agentId ? parseInt(body.agentId) : null
      },
      include: {
        images: true,
        features: true,
        agent: true
      }
    })

    // Criar características se fornecidas
    if (body.features && body.features.length > 0) {
      await prisma.propertyFeature.createMany({
        data: body.features.map((feature: string) => ({
          name: feature,
          propertyId: property.id
        }))
      })
    }

    // Criar imagens se fornecidas
    if (body.images && body.images.length > 0) {
      await prisma.image.createMany({
        data: body.images.map((image: any, index: number) => ({
          url: image.url,
          alt: image.alt || '',
          type: image.type || 'GALLERY',
          order: index + 1,
          propertyId: property.id
        }))
      })
    }

    return {
      success: true,
      data: property
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar propriedade'
    })
  }
})
