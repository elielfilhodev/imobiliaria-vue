<template>
  <div>
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Propriedades Disponiveis</h1>
        <p class="text-lg text-gray-600">Encontre o imovel perfeito para voce</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 class="text-xl font-semibold mb-4">Filtros</h2>
            
            <!-- Property Type -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imovel</label>
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

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Faixa de Preco</label>
              <select v-model="filters.priceRange" class="input-field">
                <option value="">Qualquer preco</option>
                <option value="0-300000">Ate R$ 300.000</option>
                <option value="300000-500000">R$ 300.000 - R$ 500.000</option>
                <option value="500000-800000">R$ 500.000 - R$ 800.000</option>
                <option value="800000-1200000">R$ 800.000 - R$ 1.200.000</option>
                <option value="1200000+">Acima de R$ 1.200.000</option>
              </select>
            </div>

            <!-- Bedrooms -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
              <select v-model="filters.bedrooms" class="input-field">
                <option value="">Qualquer</option>
                <option value="1">1 quarto</option>
                <option value="2">2 quartos</option>
                <option value="3">3 quartos</option>
                <option value="4">4 quartos</option>
                <option value="5+">5+ quartos</option>
              </select>
            </div>

            <!-- Location -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Localizacao</label>
              <input 
                v-model="filters.location" 
                type="text" 
                placeholder="Digite o bairro ou cidade"
                class="input-field"
              >
            </div>

            <!-- Clear Filters -->
            <button 
              @click="clearFilters" 
              class="w-full btn-secondary mb-4"
            >
              Limpar Filtros
            </button>

            <!-- Search -->
            <button 
              @click="applyFilters" 
              class="w-full btn-primary"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>

        <!-- Properties Grid -->
        <div class="lg:w-3/4">
          <!-- Results Header -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                <span v-if="isLoading">Carregando propriedades...</span>
                <span v-else-if="loadError">Erro ao carregar propriedades</span>
                <span v-else>{{ filteredProperties.length }} propriedades encontradas</span>
              </h2>
              <p class="text-gray-600">Mostrando resultados para sua busca</p>
            </div>
            
            <!-- Sort -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select v-model="sortBy" class="input-field w-44">
                <option value="newest">Mais recentes</option>
                <option value="price-asc">Menor preco</option>
                <option value="price-desc">Maior preco</option>
                <option value="area-desc">Maior area</option>
              </select>
            </div>
          </div>

          <div v-if="loadError" class="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            <p>{{ loadError }}</p>
            <button class="btn-primary mt-4" @click="reload">Tentar novamente</button>
          </div>

          <div v-else>
            <!-- Properties Grid -->
            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="index in 6" :key="index" class="animate-pulse">
                <div class="h-48 bg-gray-200 rounded-t-lg"></div>
                <div class="bg-white rounded-b-lg p-4 space-y-3 shadow-sm">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>

            <div v-else-if="filteredProperties.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhuma propriedade encontrada</h3>
              <p class="text-gray-600 mb-4">Tente ajustar os filtros ou limpar a busca.</p>
              <button class="btn-primary" @click="clearFilters">Limpar filtros</button>
            </div>

            <div v-else class="space-y-10">
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <PropertyCard 
                  v-for="property in paginatedProperties" 
                  :key="property.id"
                  :property="property"
                />
              </div>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex justify-center">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePropertyStore } from '~/stores/properties'

import { computed, reactive, ref, watch } from 'vue'

const propertyStore = usePropertyStore()
const { properties } = storeToRefs(propertyStore)

const isLoading = ref(true)
const loadError = ref('')

const filters = reactive({
  type: '',
  priceRange: '',
  bedrooms: '',
  location: ''
})

const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 6

const parsePriceRange = (range) => {
  if (!range) {
    return null
  }

  if (range.endsWith('+')) {
    return {
      min: Number(range.replace('+', '')) || 0,
      max: null
    }
  }

  const [min, max] = range.split('-').map((value) => Number(value) || 0)

  return {
    min,
    max: max || null
  }
}

const loadProperties = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    await propertyStore.fetchProperties()
  } catch (error) {
    console.error('Erro ao carregar propriedades:', error)
    loadError.value = 'Nao foi possivel carregar as propriedades. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

await loadProperties()

const filteredProperties = computed(() => {
  let list = properties.value || []

  if (filters.type) {
    list = list.filter((property) => property.type === filters.type)
  }

  if (filters.priceRange) {
    const range = parsePriceRange(filters.priceRange)

    if (range) {
      list = list.filter((property) => {
        if (range.max === null) {
          return property.price >= range.min
        }
        return property.price >= range.min && property.price <= range.max
      })
    }
  }

  if (filters.bedrooms) {
    if (filters.bedrooms === '5+') {
      list = list.filter((property) => property.bedrooms >= 5)
    } else {
      const bedrooms = Number(filters.bedrooms)
      list = list.filter((property) => property.bedrooms === bedrooms)
    }
  }

  if (filters.location) {
    const term = filters.location.toLowerCase()
    list = list.filter((property) => property.location?.toLowerCase().includes(term))
  }

  const sorted = [...list]

  switch (sortBy.value) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'area-desc':
      sorted.sort((a, b) => (b.area || 0) - (a.area || 0))
      break
    case 'newest':
    default:
      sorted.sort(
        (a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
      )
      break
  }

  return sorted
})

const totalPages = computed(() => {
  if (!filteredProperties.value.length) {
    return 1
  }
  return Math.ceil(filteredProperties.value.length / itemsPerPage)
})

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProperties.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)

  for (let index = start; index <= end; index += 1) {
    pages.push(index)
  }

  return pages
})

watch(
  () => ({ ...filters, sortBy: sortBy.value }),
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

const clearFilters = () => {
  filters.type = ''
  filters.priceRange = ''
  filters.bedrooms = ''
  filters.location = ''
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const reload = () => {
  loadProperties()
}

useHead({
  title: 'Propriedades - Imobiliaria Generica',
  meta: [
    {
      name: 'description',
      content:
        'Encontre casas, apartamentos e terrenos disponiveis. Filtre por preco, localizacao e caracteristicas.'
    }
  ]
})
</script>
