<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Galeria de Imagens</h1>
          <p class="text-gray-600 mt-2">Gerencie as imagens das propriedades</p>
        </div>
        <button @click="showUploadModal = true" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Upload de Imagens
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por Propriedade</label>
          <select v-model="selectedProperty" class="input-field">
            <option value="">Todas as propriedades</option>
            <option v-for="prop in properties" :key="prop.id" :value="prop.id">
              {{ prop.title }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imagem</label>
          <select v-model="imageType" class="input-field">
            <option value="">Todas</option>
            <option value="principal">Principal</option>
            <option value="galeria">Galeria</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button @click="applyFilters" class="btn-primary w-full">
            Filtrar
          </button>
        </div>
      </div>
    </div>

    <!-- Images Grid -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="filteredImages.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma imagem encontrada</h3>
        <p class="mt-1 text-sm text-gray-500">Comece fazendo upload de imagens.</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="image in filteredImages" :key="image.id" class="relative group">
          <div class="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
            <img :src="image.url" :alt="image.alt" class="w-full h-48 object-cover">
          </div>
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <button @click="viewImage(image)" class="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                Ver
              </button>
              <button @click="editImage(image)" class="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700">
                Editar
              </button>
              <button @click="deleteImage(image.id)" class="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700">
                Excluir
              </button>
            </div>
          </div>
          
          <!-- Image Info -->
          <div class="mt-2">
            <p class="text-sm font-medium text-gray-900 truncate">{{ image.propertyTitle }}</p>
            <p class="text-xs text-gray-500">{{ image.type }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(image.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Upload de Imagens</h3>
          <button @click="showUploadModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="uploadImages" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Propriedade</label>
            <select v-model="uploadForm.propertyId" required class="input-field">
              <option value="">Selecione a propriedade</option>
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                {{ prop.title }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Imagem</label>
            <select v-model="uploadForm.type" required class="input-field">
              <option value="">Selecione o tipo</option>
              <option value="principal">Imagem Principal</option>
              <option value="galeria">Galeria</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
            <input 
              v-model="uploadForm.url" 
              type="url" 
              required
              class="input-field"
              placeholder="https://exemplo.com/imagem.jpg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <input 
              v-model="uploadForm.alt" 
              type="text" 
              class="input-field"
              placeholder="Descrição da imagem"
            >
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showUploadModal = false" class="btn-secondary">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Image Viewer Modal -->
    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="selectedImage = null">
      <div class="max-w-4xl max-h-full p-4">
        <img :src="selectedImage.url" :alt="selectedImage.alt" class="max-w-full max-h-full object-contain">
        <div class="mt-4 text-center text-white">
          <p class="text-lg font-medium">{{ selectedImage.propertyTitle }}</p>
          <p class="text-sm text-gray-300">{{ selectedImage.type }}</p>
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
  { id: 1, title: 'Casa Moderna com Piscina' },
  { id: 2, title: 'Apartamento Luxo Centro' },
  { id: 3, title: 'Cobertura com Vista Mar' },
  { id: 4, title: 'Casa Familiar Jardim' },
  { id: 5, title: 'Apartamento Compacto' }
])

const allImages = ref([
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    alt: 'Casa moderna vista frontal',
    propertyId: 1,
    propertyTitle: 'Casa Moderna com Piscina',
    type: 'principal',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    alt: 'Piscina da casa',
    propertyId: 1,
    propertyTitle: 'Casa Moderna com Piscina',
    type: 'galeria',
    createdAt: '2024-01-15'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    alt: 'Apartamento luxo',
    propertyId: 2,
    propertyTitle: 'Apartamento Luxo Centro',
    type: 'principal',
    createdAt: '2024-01-14'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    alt: 'Jardim da casa',
    propertyId: 4,
    propertyTitle: 'Casa Familiar Jardim',
    type: 'galeria',
    createdAt: '2024-01-12'
  }
])

const selectedProperty = ref('')
const imageType = ref('')
const showUploadModal = ref(false)
const selectedImage = ref(null)

const uploadForm = ref({
  propertyId: '',
  type: '',
  url: '',
  alt: ''
})

const filteredImages = computed(() => {
  let filtered = [...allImages.value]

  if (selectedProperty.value) {
    filtered = filtered.filter(img => img.propertyId === parseInt(selectedProperty.value))
  }

  if (imageType.value) {
    filtered = filtered.filter(img => img.type === imageType.value)
  }

  return filtered
})

const applyFilters = () => {
  // Filtros já aplicados via computed
}

const viewImage = (image) => {
  selectedImage.value = image
}

const editImage = (image) => {
  // Implementar edição
  console.log('Editando imagem:', image)
}

const deleteImage = (imageId) => {
  if (confirm('Tem certeza que deseja excluir esta imagem?')) {
    const index = allImages.value.findIndex(img => img.id === imageId)
    if (index > -1) {
      allImages.value.splice(index, 1)
    }
  }
}

const uploadImages = () => {
  // Validar dados
  if (!uploadForm.value.propertyId || !uploadForm.value.type || !uploadForm.value.url) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }

  // Simular upload
  const newImage = {
    id: Date.now(),
    url: uploadForm.value.url,
    alt: uploadForm.value.alt || 'Imagem',
    propertyId: parseInt(uploadForm.value.propertyId),
    propertyTitle: properties.value.find(p => p.id === parseInt(uploadForm.value.propertyId))?.title || '',
    type: uploadForm.value.type,
    createdAt: new Date().toISOString().split('T')[0]
  }

  allImages.value.unshift(newImage)
  
  // Limpar formulário
  uploadForm.value = {
    propertyId: '',
    type: '',
    url: '',
    alt: ''
  }
  
  showUploadModal.value = false
  alert('Imagem adicionada com sucesso!')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>
