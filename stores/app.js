import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // Configurações gerais da aplicação
    siteName: 'Imobiliária Genérica',
    siteDescription: 'Encontre o imóvel dos seus sonhos com a melhor imobiliária da região',
    
    // Configurações de contato
    contact: {
      phone: '(11) 3333-4444',
      whatsapp: '(11) 99999-9999',
      email: 'contato@imobiliaria.com',
      address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
      cep: '01234-567',
      hours: {
        weekdays: '8h às 18h',
        saturday: '8h às 12h',
        sunday: 'Fechado'
      }
    },

    // Configurações de redes sociais
    socialMedia: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#'
    },

    // Configurações de SEO
    seo: {
      defaultTitle: 'Imobiliária Genérica - Encontre o Imóvel dos Seus Sonhos',
      defaultDescription: 'Encontre casas, apartamentos e terrenos com qualidade e confiança. A melhor imobiliária da região.',
      keywords: ['imobiliária', 'casas', 'apartamentos', 'terrenos', 'venda', 'locação', 'São Paulo']
    },

    // Configurações de paginação
    pagination: {
      itemsPerPage: 6,
      adminItemsPerPage: 10
    },

    // Configurações de upload
    upload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxImagesPerProperty: 20
    },

    // Configurações de notificações
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    },

    // Estatísticas gerais
    stats: {
      totalProperties: 45,
      soldProperties: 12,
      totalContacts: 28,
      monthlyRevenue: 125000,
      yearsExperience: 15
    },

    // Configurações de tema
    theme: {
      primaryColor: '#2563eb', // blue-600
      secondaryColor: '#64748b', // slate-500
      accentColor: '#dc2626' // red-600
    },

    // Estado de carregamento
    loading: false,
    
    // Mensagens de feedback
    messages: {
      success: '',
      error: '',
      warning: '',
      info: ''
    }
  }),

  getters: {
    isAdmin: () => {
      // Implementar lógica de autenticação
      return false
    },

    formattedPhone: (state) => {
      return state.contact.phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    },

    formattedWhatsApp: (state) => {
      return state.contact.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    },

    formattedRevenue: (state) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(state.stats.monthlyRevenue)
    }
  },

  actions: {
    setLoading(loading) {
      this.loading = loading
    },

    setMessage(type, message) {
      this.messages[type] = message
      
      // Limpar mensagem após 5 segundos
      setTimeout(() => {
        this.messages[type] = ''
      }, 5000)
    },

    clearMessages() {
      this.messages = {
        success: '',
        error: '',
        warning: '',
        info: ''
      }
    },

    updateContact(contact) {
      this.contact = { ...this.contact, ...contact }
    },

    updateSocialMedia(socialMedia) {
      this.socialMedia = { ...this.socialMedia, ...socialMedia }
    },

    updateSEO(seo) {
      this.seo = { ...this.seo, ...seo }
    },

    updateStats(stats) {
      this.stats = { ...this.stats, ...stats }
    },

    updateTheme(theme) {
      this.theme = { ...this.theme, ...theme }
    },

    // Métodos utilitários
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },

    formatDateTime(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    generateSlug(text) {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },

    validatePhone(phone) {
      const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
      return re.test(phone)
    }
  }
})
