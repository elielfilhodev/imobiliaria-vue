<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Propriedades</h1>
          <p class="text-gray-600 mt-2">Gerencie todas as propriedades cadastradas</p>
        </div>
        <NuxtLink to="/admin/propriedades/nova" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nova Propriedade
        </NuxtLink>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select v-model="filters.type" class="input-field">
            <option value="">Todos</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" class="input-field">
            <option value="">Todos</option>
            <option value="disponivel">Disponível</option>
            <option value="vendido">Vendido</option>
            <option value="locado">Locado</option>
            <option value="rascunho">Rascunho</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Localização</label>
          <input 
            v-model="filters.location" 
            type="text" 
            placeholder="Buscar por localização"
            class="input-field"
          >
        </div>
        
        <div class="flex items-end">
          <button @click="applyFilters" class="btn-primary w-full">
            Filtrar
          </button>
        </div>
      </div>
    </div>

    <!-- Properties Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriedade
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
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
            <tr v-for="property in filteredProperties" :key="property.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="property.image" :alt="property.title" class="w-12 h-12 object-cover rounded-lg mr-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ property.title }}</div>
                    <div class="text-sm text-gray-500">{{ property.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {{ property.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(property.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(property.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusText(property.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(property.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink :to="`/propriedades/${property.id}`" class="text-blue-600 hover:text-blue-900" target="_blank">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </NuxtLink>
                  <NuxtLink :to="`/admin/propriedades/${property.id}/editar`" class="text-green-600 hover:text-green-900">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </NuxtLink>
                  <button @click="deleteProperty(property.id)" class="text-red-600 hover:text-red-900">
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
      <div v-if="filteredProperties.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma propriedade encontrada</h3>
        <p class="mt-1 text-sm text-gray-500">Comece criando uma nova propriedade.</p>
        <div class="mt-6">
          <NuxtLink to="/admin/propriedades/nova" class="btn-primary">
            Nova Propriedade
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Anterior
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium',
            page === currentPage 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ page }}
        </button>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Próximo
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Dados mockados para demonstração
const allProperties = ref([
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    location: 'Vila Madalena, São Paulo',
    price: 850000,
    type: 'casa',
    status: 'disponivel',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Apartamento Luxo Centro',
    location: 'Centro, São Paulo',
    price: 1200000,
    type: 'apartamento',
    status: 'vendido',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Cobertura com Vista Mar',
    location: 'Santos, São Paulo',
    price: 2500000,
    type: 'cobertura',
    status: 'disponivel',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    title: 'Casa Familiar Jardim',
    location: 'Jardins, São Paulo',
    price: 650000,
    type: 'casa',
    status: 'locado',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100',
    createdAt: '2024-01-12'
  },
  {
    id: 5,
    title: 'Apartamento Compacto',
    location: 'Mooca, São Paulo',
    price: 450000,
    type: 'apartamento',
    status: 'disponivel',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100',
    createdAt: '2024-01-11'
  }
])

const filters = ref({
  type: '',
  status: '',
  location: ''
})

const currentPage = ref(1)
const itemsPerPage = 10

const filteredProperties = computed(() => {
  let filtered = [...allProperties.value]

  if (filters.value.type) {
    filtered = filtered.filter(p => p.type === filters.value.type)
  }

  if (filters.value.status) {
    filtered = filtered.filter(p => p.status === filters.value.status)
  }

  if (filters.value.location) {
    filtered = filtered.filter(p => 
      p.location.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredProperties.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const getStatusClass = (status) => {
  const classes = {
    disponivel: 'bg-green-100 text-green-800',
    vendido: 'bg-blue-100 text-blue-800',
    locado: 'bg-yellow-100 text-yellow-800',
    rascunho: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    disponivel: 'Disponível',
    vendido: 'Vendido',
    locado: 'Locado',
    rascunho: 'Rascunho'
  }
  return texts[status] || status
}

const applyFilters = () => {
  currentPage.value = 1
}

const deleteProperty = (id) => {
  if (confirm('Tem certeza que deseja excluir esta propriedade?')) {
    const index = allProperties.value.findIndex(p => p.id === id)
    if (index > -1) {
      allProperties.value.splice(index, 1)
    }
  }
}
</script>
