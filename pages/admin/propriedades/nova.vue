<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Nova Propriedade</h1>
          <p class="text-gray-600 mt-2">Cadastre uma nova propriedade no sistema</p>
        </div>
        <NuxtLink to="/admin/propriedades" class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </NuxtLink>
      </div>
    </div>

    <form @submit.prevent="saveProperty" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Informações Básicas</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Título *</label>
            <input 
              v-model="property.title" 
              type="text" 
              required
              class="input-field"
              placeholder="Ex: Casa Moderna com Piscina"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel *</label>
            <select v-model="property.type" required class="input-field">
              <option value="">Selecione o tipo</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="cobertura">Cobertura</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preço *</label>
            <input 
              v-model="property.price" 
              type="number" 
              required
              class="input-field"
              placeholder="850000"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Transação *</label>
            <select v-model="property.transaction" required class="input-field">
              <option value="">Selecione</option>
              <option value="venda">Venda</option>
              <option value="locacao">Locação</option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Localização *</label>
            <input 
              v-model="property.location" 
              type="text" 
              required
              class="input-field"
              placeholder="Ex: Vila Madalena, São Paulo"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea 
              v-model="property.description" 
              rows="4"
              class="input-field"
              placeholder="Descreva a propriedade..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Property Details -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Detalhes da Propriedade</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
            <input 
              v-model="property.bedrooms" 
              type="number" 
              min="0"
              class="input-field"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Banheiros</label>
            <input 
              v-model="property.bathrooms" 
              type="number" 
              min="0"
              class="input-field"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Área (m²)</label>
            <input 
              v-model="property.area" 
              type="number" 
              min="0"
              class="input-field"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vagas de Garagem</label>
            <input 
              v-model="property.parking" 
              type="number" 
              min="0"
              class="input-field"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Andar</label>
            <input 
              v-model="property.floor" 
              type="number"
              class="input-field"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Condomínio</label>
            <input 
              v-model="property.condoFee" 
              type="number" 
              min="0"
              class="input-field"
              placeholder="Valor mensal"
            >
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Características</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label v-for="feature in availableFeatures" :key="feature" class="flex items-center">
            <input 
              v-model="property.features" 
              type="checkbox" 
              :value="feature"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">{{ feature }}</span>
          </label>
        </div>
      </div>

      <!-- Images -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Imagens</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagem Principal *</label>
            <input 
              v-model="property.image" 
              type="url" 
              required
              class="input-field"
              placeholder="https://exemplo.com/imagem.jpg"
            >
            <div v-if="property.image" class="mt-2">
              <img :src="property.image" alt="Preview" class="w-32 h-32 object-cover rounded-lg">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Galeria de Imagens</label>
            <div class="space-y-2">
              <div v-for="(image, index) in property.gallery" :key="index" class="flex items-center space-x-2">
                <input 
                  v-model="property.gallery[index]" 
                  type="url" 
                  class="input-field flex-1"
                  placeholder="https://exemplo.com/imagem.jpg"
                >
                <button 
                  type="button" 
                  @click="removeGalleryImage(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <button 
              type="button" 
              @click="addGalleryImage"
              class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar Imagem
            </button>
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Status</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status da Propriedade</label>
            <select v-model="property.status" class="input-field">
              <option value="disponivel">Disponível</option>
              <option value="vendido">Vendido</option>
              <option value="locado">Locado</option>
              <option value="rascunho">Rascunho</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Destaque</label>
            <div class="flex items-center">
              <input 
                v-model="property.featured" 
                type="checkbox" 
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Exibir como propriedade em destaque</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <NuxtLink to="/admin/propriedades" class="btn-secondary">
          Cancelar
        </NuxtLink>
        <button type="submit" class="btn-primary">
          Salvar Propriedade
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const property = ref({
  title: '',
  type: '',
  price: '',
  transaction: '',
  location: '',
  description: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  parking: '',
  floor: '',
  condoFee: '',
  features: [],
  image: '',
  gallery: [],
  status: 'disponivel',
  featured: false
})

const availableFeatures = [
  'Piscina',
  'Jardim',
  'Garagem',
  'Churrasqueira',
  'Área de Lazer',
  'Elevador',
  'Portaria 24h',
  'Academia',
  'Playground',
  'Salão de Festas',
  'Quadra',
  'Sauna',
  'Ar Condicionado',
  'Aquecimento',
  'Mobiliado',
  'Cozinha Planejada',
  'Closet',
  'Varanda',
  'Terraço',
  'Sótão'
]

const addGalleryImage = () => {
  property.value.gallery.push('')
}

const removeGalleryImage = (index) => {
  property.value.gallery.splice(index, 1)
}

const saveProperty = () => {
  // Validar dados
  if (!property.value.title || !property.value.type || !property.value.price || !property.value.location) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }

  // Simular salvamento
  console.log('Salvando propriedade:', property.value)
  alert('Propriedade salva com sucesso!')
  
  // Redirecionar para lista
  navigateTo('/admin/propriedades')
}
</script>
