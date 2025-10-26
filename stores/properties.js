import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('properties', {
  state: () => ({
    properties: [],
    filters: {
      type: '',
      priceRange: '',
      bedrooms: '',
      location: '',
      transaction: ''
    },
    sortBy: 'newest'
  }),

  getters: {
    featuredProperties: (state) => {
      return state.properties.filter(property => property.featured && property.status === 'AVAILABLE')
    },

    filteredProperties: (state) => {
      let filtered = [...state.properties]

      if (state.filters.type) {
        filtered = filtered.filter(p => p.type.toLowerCase() === state.filters.type.toLowerCase())
      }

      if (state.filters.priceRange) {
        const [min, max] = state.filters.priceRange.split('-').map(Number)
        if (max) {
          filtered = filtered.filter(p => p.price >= min && p.price <= max)
        } else {
          filtered = filtered.filter(p => p.price >= min)
        }
      }

      if (state.filters.bedrooms) {
        const bedrooms = parseInt(state.filters.bedrooms)
        if (bedrooms === 5) {
          filtered = filtered.filter(p => p.bedrooms >= 5)
        } else {
          filtered = filtered.filter(p => p.bedrooms === bedrooms)
        }
      }

      if (state.filters.location) {
        filtered = filtered.filter(p => 
          p.location.toLowerCase().includes(state.filters.location.toLowerCase())
        )
      }

      if (state.filters.transaction) {
        filtered = filtered.filter(p => p.transaction.toLowerCase() === state.filters.transaction.toLowerCase())
      }

      // Aplicar ordenação
      switch (state.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'area-desc':
          filtered.sort((a, b) => b.area - a.area)
          break
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
      }

      return filtered
    },

    getPropertyById: (state) => {
      return (id) => state.properties.find(property => property.id === parseInt(id))
    }
  },

  actions: {
    async fetchProperties() {
      try {
        const { data } = await $fetch('/api/properties')
        this.properties = data
      } catch (error) {
        console.error('Erro ao buscar propriedades:', error)
      }
    },

    async addProperty(property) {
      try {
        const { data } = await $fetch('/api/properties', {
          method: 'POST',
          body: property
        })
        this.properties.unshift(data)
        return data
      } catch (error) {
        console.error('Erro ao criar propriedade:', error)
        throw error
      }
    },

    async updateProperty(id, updates) {
      try {
        const { data } = await $fetch(`/api/properties/${id}`, {
          method: 'PUT',
          body: updates
        })
        const index = this.properties.findIndex(p => p.id === id)
        if (index > -1) {
          this.properties[index] = data
        }
        return data
      } catch (error) {
        console.error('Erro ao atualizar propriedade:', error)
        throw error
      }
    },

    async deleteProperty(id) {
      try {
        await $fetch(`/api/properties/${id}`, {
          method: 'DELETE'
        })
        const index = this.properties.findIndex(p => p.id === id)
        if (index > -1) {
          this.properties.splice(index, 1)
        }
      } catch (error) {
        console.error('Erro ao deletar propriedade:', error)
        throw error
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {
        type: '',
        priceRange: '',
        bedrooms: '',
        location: '',
        transaction: ''
      }
    },

    setSortBy(sortBy) {
      this.sortBy = sortBy
    }
  }
})
