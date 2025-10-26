import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        subject: body.subject || 'Contato via site',
        propertyId: body.propertyId ? parseInt(body.propertyId) : null,
        status: 'UNREAD',
        read: false
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
      statusMessage: 'Erro ao criar contato'
    })
  }
})
