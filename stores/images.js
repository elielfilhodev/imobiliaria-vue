import { defineStore } from 'pinia'

export const useImageStore = defineStore('images', {
  state: () => ({
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        alt: 'Casa moderna vista frontal',
        propertyId: 1,
        propertyTitle: 'Casa Moderna com Piscina',
        type: 'principal',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        alt: 'Piscina da casa',
        propertyId: 1,
        propertyTitle: 'Casa Moderna com Piscina',
        type: 'galeria',
        createdAt: '2024-01-15'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        alt: 'Apartamento luxo',
        propertyId: 2,
        propertyTitle: 'Apartamento Luxo Centro',
        type: 'principal',
        createdAt: '2024-01-14'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        alt: 'Jardim da casa',
        propertyId: 4,
        propertyTitle: 'Casa Familiar Jardim',
        type: 'galeria',
        createdAt: '2024-01-12'
      }
    ],
    filters: {
      property: '',
      type: ''
    }
  }),

  getters: {
    filteredImages: (state) => {
      let filtered = [...state.images]

      if (state.filters.property) {
        filtered = filtered.filter(img => img.propertyId === parseInt(state.filters.property))
      }

      if (state.filters.type) {
        filtered = filtered.filter(img => img.type === state.filters.type)
      }

      return filtered
    },

    getImagesByProperty: (state) => {
      return (propertyId) => state.images.filter(img => img.propertyId === parseInt(propertyId))
    },

    getMainImageByProperty: (state) => {
      return (propertyId) => state.images.find(img => 
        img.propertyId === parseInt(propertyId) && img.type === 'principal'
      )
    },

    getGalleryImagesByProperty: (state) => {
      return (propertyId) => state.images.filter(img => 
        img.propertyId === parseInt(propertyId) && img.type === 'galeria'
      )
    }
  },

  actions: {
    addImage(image) {
      const newImage = {
        ...image,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      this.images.unshift(newImage)
    },

    updateImage(id, updates) {
      const index = this.images.findIndex(img => img.id === id)
      if (index > -1) {
        this.images[index] = { ...this.images[index], ...updates }
      }
    },

    deleteImage(id) {
      const index = this.images.findIndex(img => img.id === id)
      if (index > -1) {
        this.images.splice(index, 1)
      }
    },

    deleteImagesByProperty(propertyId) {
      this.images = this.images.filter(img => img.propertyId !== parseInt(propertyId))
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {
        property: '',
        type: ''
      }
    }
  }
})
