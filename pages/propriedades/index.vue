<template>
  <div>
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Propriedades Disponíveis</h1>
        <p class="text-lg text-gray-600">Encontre o imóvel perfeito para você</p>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
              <select v-model="filters.type" class="input-field">
                <option value="">Todos</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Faixa de Preço</label>
              <select v-model="filters.priceRange" class="input-field">
                <option value="">Qualquer preço</option>
                <option value="0-300000">Até R$ 300.000</option>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Localização</label>
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
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                {{ filteredProperties.length }} propriedades encontradas
              </h2>
              <p class="text-gray-600">Mostrando resultados para sua busca</p>
            </div>
            
            <!-- Sort -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select v-model="sortBy" class="input-field w-40">
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="area-desc">Maior área</option>
                <option value="newest">Mais recentes</option>
              </select>
            </div>
          </div>

          <!-- Properties Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <PropertyCard 
              v-for="property in paginatedProperties" 
              :key="property.id"
              :property="property"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-12 flex justify-center">
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
      </div>
    </div>
  </div>
</template>

<script setup>
// Dados mockados para demonstração
const allProperties = ref([
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 850000,
    location: 'Vila Madalena, São Paulo',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500',
    type: 'casa',
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Apartamento Luxo Centro',
    price: 1200000,
    location: 'Centro, São Paulo',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
    type: 'apartamento',
    featured: true,
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Cobertura com Vista Mar',
    price: 2500000,
    location: 'Santos, São Paulo',
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500',
    type: 'cobertura',
    featured: true,
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    title: 'Casa Familiar Jardim',
    price: 650000,
    location: 'Jardins, São Paulo',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
    type: 'casa',
    featured: false,
    createdAt: '2024-01-12'
  },
  {
    id: 5,
    title: 'Apartamento Compacto',
    price: 450000,
    location: 'Mooca, São Paulo',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
    type: 'apartamento',
    featured: false,
    createdAt: '2024-01-11'
  },
  {
    id: 6,
    title: 'Terreno Comercial',
    price: 800000,
    location: 'Vila Olímpia, São Paulo',
    bedrooms: 0,
    bathrooms: 0,
    area: 300,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500',
    type: 'terreno',
    featured: false,
    createdAt: '2024-01-10'
  }
])

// Filtros
const filters = ref({
  type: '',
  priceRange: '',
  bedrooms: '',
  location: ''
})

const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 6

// Computed properties
const filteredProperties = computed(() => {
  let filtered = [...allProperties.value]

  // Aplicar filtros
  if (filters.value.type) {
    filtered = filtered.filter(p => p.type === filters.value.type)
  }

  if (filters.value.priceRange) {
    const [min, max] = filters.value.priceRange.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(p => p.price >= min && p.price <= max)
    } else {
      filtered = filtered.filter(p => p.price >= min)
    }
  }

  if (filters.value.bedrooms) {
    const bedrooms = parseInt(filters.value.bedrooms)
    if (bedrooms === 5) {
      filtered = filtered.filter(p => p.bedrooms >= 5)
    } else {
      filtered = filtered.filter(p => p.bedrooms === bedrooms)
    }
  }

  if (filters.value.location) {
    filtered = filtered.filter(p => 
      p.location.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }

  // Aplicar ordenação
  switch (sortBy.value) {
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
})

const totalPages = computed(() => {
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
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const clearFilters = () => {
  filters.value = {
    type: '',
    priceRange: '',
    bedrooms: '',
    location: ''
  }
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

// Watch para resetar página quando filtros mudarem
watch([filters, sortBy], () => {
  currentPage.value = 1
})

// SEO
useHead({
  title: 'Propriedades - Imobiliária Genérica',
  meta: [
    { name: 'description', content: 'Encontre casas, apartamentos e terrenos disponíveis. Filtre por preço, localização e características.' }
  ]
})
</script>
