<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">Buscar Propriedades</h2>
    
    <form @submit.prevent="handleSearch" class="space-y-4">
      <!-- Property Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
        <select v-model="searchFilters.type" class="input-field">
          <option value="">Todos os tipos</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="terreno">Terreno</option>
          <option value="comercial">Comercial</option>
        </select>
      </div>

      <!-- Transaction Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Transação</label>
        <select v-model="searchFilters.transaction" class="input-field">
          <option value="">Compra e Locação</option>
          <option value="venda">Venda</option>
          <option value="locacao">Locação</option>
        </select>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Localização</label>
        <input 
          v-model="searchFilters.location" 
          type="text" 
          placeholder="Digite o bairro ou cidade"
          class="input-field"
        >
      </div>

      <!-- Price Range -->
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
          <select v-model="searchFilters.minPrice" class="input-field">
            <option value="">Qualquer</option>
            <option value="100000">R$ 100.000</option>
            <option value="200000">R$ 200.000</option>
            <option value="300000">R$ 300.000</option>
            <option value="500000">R$ 500.000</option>
            <option value="800000">R$ 800.000</option>
            <option value="1000000">R$ 1.000.000</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
          <select v-model="searchFilters.maxPrice" class="input-field">
            <option value="">Qualquer</option>
            <option value="300000">R$ 300.000</option>
            <option value="500000">R$ 500.000</option>
            <option value="800000">R$ 800.000</option>
            <option value="1000000">R$ 1.000.000</option>
            <option value="1500000">R$ 1.500.000</option>
            <option value="2000000">R$ 2.000.000</option>
            <option value="5000000">R$ 5.000.000</option>
          </select>
        </div>
      </div>

      <!-- Bedrooms -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
        <select v-model="searchFilters.bedrooms" class="input-field">
          <option value="">Qualquer quantidade</option>
          <option value="1">1 quarto</option>
          <option value="2">2 quartos</option>
          <option value="3">3 quartos</option>
          <option value="4">4 quartos</option>
          <option value="5">5+ quartos</option>
        </select>
      </div>

      <!-- Features -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Características</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center">
            <input 
              v-model="searchFilters.features" 
              type="checkbox" 
              value="piscina"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">Piscina</span>
          </label>
          
          <label class="flex items-center">
            <input 
              v-model="searchFilters.features" 
              type="checkbox" 
              value="garagem"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">Garagem</span>
          </label>
          
          <label class="flex items-center">
            <input 
              v-model="searchFilters.features" 
              type="checkbox" 
              value="jardim"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">Jardim</span>
          </label>
          
          <label class="flex items-center">
            <input 
              v-model="searchFilters.features" 
              type="checkbox" 
              value="churrasqueira"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">Churrasqueira</span>
          </label>
        </div>
      </div>

      <!-- Search Button -->
      <button type="submit" class="w-full btn-primary">
        Buscar Propriedades
      </button>

      <!-- Clear Button -->
      <button type="button" @click="clearFilters" class="w-full btn-secondary">
        Limpar Filtros
      </button>
    </form>
  </div>
</template>

<script setup>
const searchFilters = ref({
  type: '',
  transaction: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  features: []
})

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', { ...searchFilters.value })
  navigateTo({
    path: '/propriedades',
    query: searchFilters.value
  })
}

const clearFilters = () => {
  searchFilters.value = {
    type: '',
    transaction: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    features: []
  }
}
</script>
