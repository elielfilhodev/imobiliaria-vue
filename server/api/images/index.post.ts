import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const image = await prisma.image.create({
      data: {
        url: body.url,
        alt: body.alt || '',
        type: body.type || 'GALLERY',
        order: body.order || 0,
        propertyId: parseInt(body.propertyId)
      },
      include: {
        property: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return {
      success: true,
      data: image
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar imagem'
    })
  }
})
