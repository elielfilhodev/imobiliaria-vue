const PROPERTY_TYPE_LABELS = {
  CASA: 'Casa',
  APARTAMENTO: 'Apartamento',
  COBERTURA: 'Cobertura',
  TERRENO: 'Terreno',
  COMERCIAL: 'Comercial',
  RURAL: 'Rural'
}

const PROPERTY_TRANSACTION_LABELS = {
  VENDA: 'Venda',
  LOCACAO: 'Locacao',
  VENDA_LOCACAO: 'Venda ou Locacao'
}

const PROPERTY_STATUS_LABELS = {
  AVAILABLE: 'Disponivel',
  SOLD: 'Vendido',
  RENTED: 'Locado',
  DRAFT: 'Rascunho'
}

export const PROPERTY_IMAGE_PLACEHOLDER = 'https://placehold.co/800x600?text=Sem+foto'

const sortImages = (images = []) => {
  return [...images].sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 0
    const orderB = typeof b.order === 'number' ? b.order : 0
    return orderA - orderB
  })
}

const buildGallery = (images, mainImage) => {
  return images
    .filter((image) => !mainImage || image.id !== mainImage.id)
    .map((image) => ({
      url: image.url,
      alt: image.alt || '',
      type: image.type || 'GALLERY',
      order: image.order || 0
    }))
}

export const mapProperty = (property) => {
  if (!property) {
    return null
  }

  const images = Array.isArray(property.images) ? sortImages(property.images) : []
  const mainImage = images.find((image) => image.type === 'MAIN') || images[0] || null
  const galleryImages = buildGallery(images, mainImage)
  return {
    ...property,
    image: mainImage?.url || PROPERTY_IMAGE_PLACEHOLDER,
    mainImage,
    galleryImages,
    gallery: galleryImages.map((image) => image.url),
    displayType: PROPERTY_TYPE_LABELS[property.type] || property.type,
    displayTransaction: PROPERTY_TRANSACTION_LABELS[property.transaction] || property.transaction,
    displayStatus: PROPERTY_STATUS_LABELS[property.status] || property.status,
    featureNames: Array.isArray(property.features)
      ? property.features.map((feature) => feature.name || feature)
      : []
  }
}

export const mapProperties = (properties = []) => {
  return properties.map((property) => mapProperty(property)).filter(Boolean)
}

export const getTypeLabel = (type) => PROPERTY_TYPE_LABELS[type] || type
export const getTransactionLabel = (transaction) =>
  PROPERTY_TRANSACTION_LABELS[transaction] || transaction
export const getStatusLabel = (status) => PROPERTY_STATUS_LABELS[status] || status
