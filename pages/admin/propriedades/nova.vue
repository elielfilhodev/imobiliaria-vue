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
      <div v-if="saveError" class="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
        {{ saveError }}
      </div>

      <!-- Informacoes Basicas -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Informacoes Basicas</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titulo *</label>
            <input 
              v-model="property.title" 
              type="text" 
              required
              class="input-field"
              placeholder="Ex: Casa Moderna com Piscina"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imovel *</label>
            <select v-model="property.type" required class="input-field">
              <option value="">Selecione o tipo</option>
              <option value="CASA">Casa</option>
              <option value="APARTAMENTO">Apartamento</option>
              <option value="COBERTURA">Cobertura</option>
              <option value="TERRENO">Terreno</option>
              <option value="COMERCIAL">Comercial</option>
              <option value="RURAL">Rural</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preco *</label>
            <input 
              v-model="property.price" 
              type="number" 
              min="0"
              required
              class="input-field"
              placeholder="850000"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Transacao *</label>
            <select v-model="property.transaction" required class="input-field">
              <option value="">Selecione</option>
              <option value="VENDA">Venda</option>
              <option value="LOCACAO">Locacao</option>
              <option value="VENDA_LOCACAO">Venda ou Locacao</option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Localizacao *</label>
            <input 
              v-model="property.location" 
              type="text" 
              required
              class="input-field"
              placeholder="Ex: Vila Madalena, Sao Paulo"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descricao</label>
            <textarea 
              v-model="property.description" 
              rows="4"
              class="input-field"
              placeholder="Descreva a propriedade..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Detalhes da Propriedade -->
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Area (m2)</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Condominio</label>
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

      <!-- Caracteristicas -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Caracteristicas</h2>
        
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

      <!-- Imagens -->
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
                  class="text-sm text-red-600 hover:text-red-800"
                  @click="removeGalleryImage(index)"
                >
                  Remover
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
              <option value="AVAILABLE">Disponivel</option>
              <option value="SOLD">Vendido</option>
              <option value="RENTED">Locado</option>
              <option value="DRAFT">Rascunho</option>
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
        <button type="submit" class="btn-primary" :disabled="isSaving">
          <span v-if="isSaving">Salvando...</span>
          <span v-else>Salvar Propriedade</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { usePropertyStore } from '~/stores/properties'

definePageMeta({
  layout: 'admin'
})

const propertyStore = usePropertyStore()

const isSaving = ref(false)
const saveError = ref('')

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
  status: 'AVAILABLE',
  featured: false
})

const availableFeatures = [
  'Piscina',
  'Jardim',
  'Garagem',
  'Churrasqueira',
  'Area de Lazer',
  'Elevador',
  'Portaria 24h',
  'Academia',
  'Playground',
  'Salao de Festas',
  'Quadra',
  'Sauna',
  'Ar Condicionado',
  'Aquecimento',
  'Mobiliado',
  'Cozinha Planejada',
  'Closet',
  'Varanda',
  'Terraco',
  'Sotao'
]

const addGalleryImage = () => {
  property.value.gallery.push('')
}

const removeGalleryImage = (index) => {
  property.value.gallery.splice(index, 1)
}

const buildImagesPayload = () => {
  const images = []

  if (property.value.image) {
    images.push({
      url: property.value.image,
      alt: property.value.title || '',
      type: 'MAIN',
      order: 1
    })
  }

  property.value.gallery
    .map((url) => url?.trim())
    .filter(Boolean)
    .forEach((url, index) => {
      images.push({
        url,
        alt: property.value.title ? `${property.value.title} - imagem ${index + 1}` : '',
        type: 'GALLERY',
        order: index + 2
      })
    })

  return images
}

const saveProperty = async () => {
  if (!property.value.title || !property.value.type || !property.value.transaction || !property.value.price || !property.value.location) {
    alert('Por favor, preencha todos os campos obrigatorios.')
    return
  }

  if (!property.value.image) {
    alert('Informe a imagem principal da propriedade.')
    return
  }

  isSaving.value = true
  saveError.value = ''

  try {
    const payload = {
      title: property.value.title,
      type: property.value.type,
      transaction: property.value.transaction,
      price: Number(property.value.price),
      location: property.value.location,
      description: property.value.description || '',
      bedrooms: Number(property.value.bedrooms) || 0,
      bathrooms: Number(property.value.bathrooms) || 0,
      area: Number(property.value.area) || 0,
      parking: Number(property.value.parking) || 0,
      floor: property.value.floor !== '' && property.value.floor !== null ? Number(property.value.floor) : null,
      condoFee: property.value.condoFee !== '' && property.value.condoFee !== null ? Number(property.value.condoFee) : null,
      status: property.value.status,
      featured: Boolean(property.value.featured),
      features: property.value.features,
      images: buildImagesPayload()
    }

    await propertyStore.addProperty(payload)

    alert('Propriedade salva com sucesso!')
    await navigateTo('/admin/propriedades')
  } catch (error) {
    console.error('Erro ao salvar propriedade:', error)
    saveError.value = 'Nao foi possivel salvar a propriedade. Tente novamente.'
    alert(saveError.value)
  } finally {
    isSaving.value = false
  }
}
</script>
