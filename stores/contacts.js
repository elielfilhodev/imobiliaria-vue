import { defineStore } from 'pinia'

export const useContactStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    filters: {
      status: '',
      property: '',
      date: ''
    }
  }),

  getters: {
    filteredContacts: (state) => {
      let filtered = [...state.contacts]

      if (state.filters.status) {
        filtered = filtered.filter(c => c.status.toLowerCase() === state.filters.status.toLowerCase())
      }

      if (state.filters.property) {
        filtered = filtered.filter(c => c.propertyId === parseInt(state.filters.property))
      }

      if (state.filters.date) {
        const today = new Date()
        const filterDate = new Date()
        
        switch (state.filters.date) {
          case 'hoje':
            filtered = filtered.filter(c => {
              const contactDate = new Date(c.createdAt)
              return contactDate.toDateString() === today.toDateString()
            })
            break
          case 'semana':
            filterDate.setDate(today.getDate() - 7)
            filtered = filtered.filter(c => new Date(c.createdAt) >= filterDate)
            break
          case 'mes':
            filterDate.setMonth(today.getMonth() - 1)
            filtered = filtered.filter(c => new Date(c.createdAt) >= filterDate)
            break
        }
      }

      return filtered
    },

    unreadCount: (state) => {
      return state.contacts.filter(c => !c.read).length
    },

    respondedCount: (state) => {
      return state.contacts.filter(c => c.status === 'RESPONDED').length
    },

    todayCount: (state) => {
      const today = new Date()
      return state.contacts.filter(c => {
        const contactDate = new Date(c.createdAt)
        return contactDate.toDateString() === today.toDateString()
      }).length
    },

    getContactById: (state) => {
      return (id) => state.contacts.find(contact => contact.id === parseInt(id))
    }
  },

  actions: {
    async fetchContacts() {
      try {
        const { data } = await $fetch('/api/contacts')
        this.contacts = data
      } catch (error) {
        console.error('Erro ao buscar contatos:', error)
      }
    },

    async addContact(contact) {
      try {
        const { data } = await $fetch('/api/contacts', {
          method: 'POST',
          body: contact
        })
        this.contacts.unshift(data)
        return data
      } catch (error) {
        console.error('Erro ao criar contato:', error)
        throw error
      }
    },

    async markAsRead(id) {
      try {
        const { data } = await $fetch(`/api/contacts/${id}/read`, {
          method: 'PUT'
        })
        const contact = this.contacts.find(c => c.id === id)
        if (contact) {
          contact.read = true
          contact.status = 'READ'
        }
        return data
      } catch (error) {
        console.error('Erro ao marcar contato como lido:', error)
        throw error
      }
    },

    async markAsResponded(id) {
      try {
        const contact = this.contacts.find(c => c.id === id)
        if (contact) {
          contact.status = 'RESPONDED'
          contact.read = true
        }
      } catch (error) {
        console.error('Erro ao marcar contato como respondido:', error)
        throw error
      }
    },

    async markAllAsRead() {
      try {
        this.contacts.forEach(contact => {
          contact.read = true
          if (contact.status === 'UNREAD') {
            contact.status = 'READ'
          }
        })
      } catch (error) {
        console.error('Erro ao marcar todos os contatos como lidos:', error)
        throw error
      }
    },

    async deleteContact(id) {
      try {
        const index = this.contacts.findIndex(c => c.id === id)
        if (index > -1) {
          this.contacts.splice(index, 1)
        }
      } catch (error) {
        console.error('Erro ao deletar contato:', error)
        throw error
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {
        status: '',
        property: '',
        date: ''
      }
    }
  }
})
