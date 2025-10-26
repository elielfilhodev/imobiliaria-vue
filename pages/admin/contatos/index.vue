<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Contatos Recebidos</h1>
          <p class="text-gray-600 mt-2">Gerencie as mensagens e interesses dos clientes</p>
        </div>
        <div class="flex space-x-3">
          <button @click="markAllAsRead" class="btn-secondary">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Marcar Todos como Lidos
          </button>
          <button @click="exportContacts" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total de Contatos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ contacts.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Não Lidos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ unreadCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Respondidos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ respondedCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Hoje</p>
            <p class="text-2xl font-semibold text-gray-900">{{ todayCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="filters.status" class="input-field">
            <option value="">Todos</option>
            <option value="nao-lido">Não Lido</option>
            <option value="lido">Lido</option>
            <option value="respondido">Respondido</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Propriedade</label>
          <select v-model="filters.property" class="input-field">
            <option value="">Todas</option>
            <option v-for="prop in properties" :key="prop.id" :value="prop.id">
              {{ prop.title }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data</label>
          <select v-model="filters.date" class="input-field">
            <option value="">Todas</option>
            <option value="hoje">Hoje</option>
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="applyFilters" class="btn-primary w-full">
            Filtrar
          </button>
        </div>
      </div>
    </div>

    <!-- Contacts List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contato
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriedade
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensagem
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="contact in filteredContacts" :key="contact.id" :class="{'bg-yellow-50': !contact.read}" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span class="text-sm font-medium text-gray-700">{{ contact.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                    <div class="text-sm text-gray-500">{{ contact.email }}</div>
                    <div class="text-sm text-gray-500">{{ contact.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ contact.propertyTitle }}</div>
                <div class="text-sm text-gray-500">{{ formatCurrency(contact.propertyPrice) }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">{{ contact.message }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(contact.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusText(contact.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(contact.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewContact(contact)" class="text-blue-600 hover:text-blue-900">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="markAsRead(contact.id)" v-if="!contact.read" class="text-green-600 hover:text-green-900">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button @click="deleteContact(contact.id)" class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredContacts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum contato encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Os contatos aparecerão aqui quando os clientes enviarem mensagens.</p>
      </div>
    </div>

    <!-- Contact Detail Modal -->
    <div v-if="selectedContact" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Detalhes do Contato</h3>
          <button @click="selectedContact = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <p class="text-gray-900">{{ selectedContact.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ selectedContact.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Telefone</label>
              <p class="text-gray-900">{{ selectedContact.phone }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Data</label>
              <p class="text-gray-900">{{ formatDate(selectedContact.createdAt) }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Propriedade de Interesse</label>
            <p class="text-gray-900">{{ selectedContact.propertyTitle }}</p>
            <p class="text-gray-600">{{ formatCurrency(selectedContact.propertyPrice) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Mensagem</label>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-900">{{ selectedContact.message }}</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button @click="selectedContact = null" class="btn-secondary">
              Fechar
            </button>
            <button @click="markAsRead(selectedContact.id)" v-if="!selectedContact.read" class="btn-primary">
              Marcar como Lido
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Dados mockados para demonstração
const properties = ref([
  { id: 1, title: 'Casa Moderna com Piscina', price: 850000 },
  { id: 2, title: 'Apartamento Luxo Centro', price: 1200000 },
  { id: 3, title: 'Cobertura com Vista Mar', price: 2500000 }
])

const contacts = ref([
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-9999',
    message: 'Olá, estou interessada na casa da Vila Madalena. Gostaria de agendar uma visita para conhecer melhor a propriedade.',
    propertyId: 1,
    propertyTitle: 'Casa Moderna com Piscina',
    propertyPrice: 850000,
    status: 'nao-lido',
    read: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    phone: '(11) 88888-8888',
    message: 'Preciso de mais informações sobre o apartamento do centro. Qual o valor do condomínio?',
    propertyId: 2,
    propertyTitle: 'Apartamento Luxo Centro',
    propertyPrice: 1200000,
    status: 'lido',
    read: true,
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 77777-7777',
    message: 'A cobertura tem vista para o mar mesmo? E qual o valor do IPTU?',
    propertyId: 3,
    propertyTitle: 'Cobertura com Vista Mar',
    propertyPrice: 2500000,
    status: 'respondido',
    read: true,
    createdAt: '2024-01-14T16:45:00Z'
  }
])

const filters = ref({
  status: '',
  property: '',
  date: ''
})

const selectedContact = ref(null)

const filteredContacts = computed(() => {
  let filtered = [...contacts.value]

  if (filters.value.status) {
    filtered = filtered.filter(c => c.status === filters.value.status)
  }

  if (filters.value.property) {
    filtered = filtered.filter(c => c.propertyId === parseInt(filters.value.property))
  }

  if (filters.value.date) {
    const today = new Date()
    const filterDate = new Date()
    
    switch (filters.value.date) {
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
})

const unreadCount = computed(() => {
  return contacts.value.filter(c => !c.read).length
})

const respondedCount = computed(() => {
  return contacts.value.filter(c => c.status === 'respondido').length
})

const todayCount = computed(() => {
  const today = new Date()
  return contacts.value.filter(c => {
    const contactDate = new Date(c.createdAt)
    return contactDate.toDateString() === today.toDateString()
  }).length
})

const applyFilters = () => {
  // Filtros já aplicados via computed
}

const viewContact = (contact) => {
  selectedContact.value = contact
}

const markAsRead = (contactId) => {
  const contact = contacts.value.find(c => c.id === contactId)
  if (contact) {
    contact.read = true
    contact.status = 'lido'
  }
}

const markAllAsRead = () => {
  contacts.value.forEach(contact => {
    contact.read = true
    if (contact.status === 'nao-lido') {
      contact.status = 'lido'
    }
  })
}

const deleteContact = (contactId) => {
  if (confirm('Tem certeza que deseja excluir este contato?')) {
    const index = contacts.value.findIndex(c => c.id === contactId)
    if (index > -1) {
      contacts.value.splice(index, 1)
    }
  }
}

const exportContacts = () => {
  // Implementar exportação
  alert('Funcionalidade de exportação será implementada')
}

const getStatusClass = (status) => {
  const classes = {
    'nao-lido': 'bg-yellow-100 text-yellow-800',
    'lido': 'bg-blue-100 text-blue-800',
    'respondido': 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'nao-lido': 'Não Lido',
    'lido': 'Lido',
    'respondido': 'Respondido'
  }
  return texts[status] || status
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
