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
            <option value="CASA">Casa</option>
            <option value="APARTAMENTO">Apartamento</option>
            <option value="COBERTURA">Cobertura</option>
            <option value="TERRENO">Terreno</option>
            <option value="COMERCIAL">Comercial</option>
            <option value="RURAL">Rural</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" class="input-field">
            <option value="">Todos</option>
            <option value="AVAILABLE">Disponivel</option>
            <option value="SOLD">Vendido</option>
            <option value="RENTED">Locado</option>
            <option value="DRAFT">Rascunho</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Localizacao</label>
          <input 
            v-model="filters.location" 
            type="text" 
            placeholder="Buscar por localizacao"
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
    <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
      Carregando propriedades...
    </div>

    <div v-else-if="loadError" class="bg-white rounded-lg shadow-md p-12 text-center">
      <p class="text-gray-700">{{ loadError }}</p>
      <button @click="reloadProperties" class="btn-primary mt-4">
        Tentar novamente
      </button>
    </div>

    <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
      <div v-if="filteredProperties.length" class="overflow-x-auto">
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
                Preco
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="property in paginatedProperties" :key="property.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="getPropertyImage(property)" :alt="property.title" class="w-12 h-12 object-cover rounded-lg mr-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ property.title }}</div>
                    <div class="text-sm text-gray-500">{{ property.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {{ formatType(property.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(property.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusClass(property.status)]">
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
      <div v-else class="text-center py-12">
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
    <div v-if="!isLoading && !loadError && filteredProperties.length && totalPages > 1" class="mt-6 flex justify-center">
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
          Proximo
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePropertyStore } from '~/stores/properties'

definePageMeta({
  layout: 'admin'
})

const propertyStore = usePropertyStore()
const { properties } = storeToRefs(propertyStore)

const isLoading = ref(true)
const loadError = ref(null)

const filters = reactive({
  type: '',
  status: '',
  location: ''
})

const currentPage = ref(1)
const itemsPerPage = 10

const reloadProperties = async () => {
  isLoading.value = true
  loadError.value = null

  try {
    await propertyStore.fetchProperties()
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error)
    loadError.value = 'Nao foi possivel carregar as propriedades.'
  } finally {
    isLoading.value = false
  }
}

await reloadProperties()

const filteredProperties = computed(() => {
  let list = properties.value ?? []

  if (filters.type) {
    list = list.filter(property => property.type === filters.type)
  }

  if (filters.status) {
    list = list.filter(property => property.status === filters.status)
  }

  if (filters.location) {
    const term = filters.location.toLowerCase()
    list = list.filter(property => property.location?.toLowerCase().includes(term))
  }

  return list
})

const totalPages = computed(() => {
  if (!filteredProperties.value.length) {
    return 1
  }
  return Math.ceil(filteredProperties.value.length / itemsPerPage)
})

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProperties.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxPages = totalPages.value
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(maxPages, start + 4)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  return pages
})

watch(filteredProperties, (list) => {
  const maxPage = list.length ? Math.ceil(list.length / itemsPerPage) : 1

  if (currentPage.value > maxPage) {
    currentPage.value = maxPage
  }
})

const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return 'N/A'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (value) => {
  if (!value) {
    return 'N/A'
  }

  return new Date(value).toLocaleDateString('pt-BR')
}

const typeLabels = {
  CASA: 'Casa',
  APARTAMENTO: 'Apartamento',
  COBERTURA: 'Cobertura',
  TERRENO: 'Terreno',
  COMERCIAL: 'Comercial',
  RURAL: 'Rural'
}

const statusLabels = {
  AVAILABLE: 'Disponivel',
  SOLD: 'Vendido',
  RENTED: 'Locado',
  DRAFT: 'Rascunho'
}

const statusClasses = {
  AVAILABLE: 'bg-green-100 text-green-800',
  SOLD: 'bg-blue-100 text-blue-800',
  RENTED: 'bg-yellow-100 text-yellow-800',
  DRAFT: 'bg-gray-100 text-gray-800'
}

const formatType = (type) => typeLabels[type] ?? type
const getStatusText = (status) => statusLabels[status] ?? status
const getStatusClass = (status) => statusClasses[status] ?? 'bg-gray-100 text-gray-800'

const getPropertyImage = (property) => {
  if (property?.images?.length) {
    const mainImage = property.images.find(image => image.type === 'MAIN')
    return (mainImage ?? property.images[0]).url
  }

  return 'https://placehold.co/80x80?text=Sem+foto'
}

const applyFilters = () => {
  currentPage.value = 1
}

const deleteProperty = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta propriedade?')) {
    return
  }

  try {
    await propertyStore.deleteProperty(id)

    if (filteredProperties.value.length <= (currentPage.value - 1) * itemsPerPage && currentPage.value > 1) {
      currentPage.value -= 1
    }
  } catch (error) {
    console.error('Erro ao deletar propriedade:', error)
    alert('Nao foi possivel excluir a propriedade. Tente novamente.')
  }
}
</script>
