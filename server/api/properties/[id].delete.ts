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
    // Verificar se a propriedade existe
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Propriedade não encontrada'
      })
    }

    // Deletar propriedade (as imagens e características serão deletadas automaticamente devido ao onDelete: Cascade)
    await prisma.property.delete({
      where: { id: parseInt(id) }
    })

    return {
      success: true,
      message: 'Propriedade deletada com sucesso'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao deletar propriedade'
    })
  }
})
