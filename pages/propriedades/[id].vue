<template>
  <div>
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600">
      Carregando informacoes da propriedade...
    </div>

    <div v-else-if="loadError" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Nao foi possivel carregar a propriedade</h1>
        <p class="text-gray-600 mb-6">{{ loadError }}</p>
        <button class="btn-primary" @click="reload">Tentar novamente</button>
      </div>
    </div>

    <div v-else-if="property">
      <!-- Property Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <NuxtLink to="/" class="hover:text-gray-700">Inicio</NuxtLink>
            <span>/</span>
            <NuxtLink to="/propriedades" class="hover:text-gray-700">Propriedades</NuxtLink>
            <span>/</span>
            <span class="text-gray-900">{{ property.title }}</span>
          </nav>
          
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ property.title }}</h1>
          <p class="text-lg text-gray-600">{{ property.location }}</p>
          <div class="flex items-center mt-4">
            <span class="text-3xl font-bold text-blue-600">{{ formatPrice(property.price) }}</span>
            <span v-if="property.transaction === 'LOCACAO'" class="ml-2 text-gray-600">/mes</span>
          </div>
          <div class="mt-3 text-sm text-gray-500">
            <span class="mr-4">Tipo: <strong>{{ property.displayType }}</strong></span>
            <span class="mr-4">Transacao: <strong>{{ property.displayTransaction }}</strong></span>
            <span>Status: <strong>{{ property.displayStatus }}</strong></span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Image Gallery -->
            <div class="mb-8">
              <div class="relative">
                <img 
                  :src="selectedImage || property.image" 
                  :alt="property.title"
                  class="w-full h-96 object-cover rounded-lg shadow-md"
                >
                <div v-if="property.featured" class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destaque
                </div>
              </div>
              
              <!-- Additional Images -->
              <div v-if="galleryThumbnails.length" class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <button
                  v-for="(image, index) in galleryThumbnails"
                  :key="`${image.url}-${index}`"
                  type="button"
                  class="relative"
                  @click="selectedImage = image.url"
                >
                  <img 
                    :src="image.url" 
                    :alt="image.alt || `${property.title} - imagem ${index + 2}`"
                    class="w-full h-20 object-cover rounded border border-transparent hover:border-blue-500 transition"
                  >
                  <span
                    v-if="selectedImage === image.url"
                    class="absolute inset-0 border-2 border-blue-500 rounded"
                  />
                </button>
              </div>
            </div>

            <!-- Property Details -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-semibold mb-4">Detalhes da Propriedade</h2>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                  <div class="text-lg font-semibold">{{ property.bedrooms || 0 }}</div>
                  <div class="text-sm text-gray-600">Quartos</div>
                </div>
                
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z" />
                  </svg>
                  <div class="text-lg font-semibold">{{ property.bathrooms || 0 }}</div>
                  <div class="text-sm text-gray-600">Banheiros</div>
                </div>
                
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <div class="text-lg font-semibold">{{ property.area || 0 }}m2</div>
                  <div class="text-sm text-gray-600">Area Total</div>
                </div>
                
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div class="text-lg font-semibold">{{ property.parking || 0 }}</div>
                  <div class="text-sm text-gray-600">Vagas</div>
                </div>
              </div>

              <div v-if="property.description" class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-900">Descricao</h3>
                <p class="text-gray-600 leading-relaxed">{{ property.description }}</p>
              </div>
            </div>

            <!-- Features -->
            <div v-if="property.featureNames && property.featureNames.length" class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-semibold mb-4">Caracteristicas</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  v-for="(feature, index) in property.featureNames" 
                  :key="`${feature}-${index}`"
                  class="flex items-center text-gray-600"
                >
                  <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Sidebar -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Fale com um especialista</h2>
              
              <div v-if="submitSuccess" class="mb-4 rounded bg-green-50 border border-green-200 text-green-700 p-3 text-sm">
                Mensagem enviada com sucesso! Retornaremos em breve.
              </div>
              <div v-else-if="submitError" class="mb-4 rounded bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
                {{ submitError }}
              </div>

              <form @submit.prevent="submitContact" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input 
                    v-model="contactForm.name"
                    type="text"
                    class="input-field"
                    placeholder="Seu nome"
                    required
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    v-model="contactForm.email"
                    type="email"
                    class="input-field"
                    placeholder="seu@email.com"
                    required
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input 
                    v-model="contactForm.phone"
                    type="tel"
                    class="input-field"
                    placeholder="(00) 00000-0000"
                    required
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea 
                    v-model="contactForm.message"
                    rows="4"
                    class="input-field"
                    placeholder="Conte-nos mais sobre seu interesse"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  class="btn-primary w-full"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Enviando...</span>
                  <span v-else>Enviar mensagem</span>
                </button>
              </form>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold mb-4">Corretor Responsavel</h3>
              <div class="flex items-center mb-4">
                <img
                  :src="property.agent?.avatar || agentPlaceholder"
                  :alt="property.agent?.name || 'Corretor'"
                  class="w-12 h-12 object-cover rounded-full mr-4"
                >
                <div>
                  <h4 class="font-semibold">{{ property.agent?.name || 'Corretor da Imobiliaria' }}</h4>
                  <p class="text-gray-600 text-sm">CRECI: {{ property.agent?.creci || '00000' }}</p>
                </div>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{{ property.agent?.phone || '(00) 00000-0000' }}</span>
                </div>
                
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{{ property.agent?.email || 'contato@imobiliaria.com' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="selectedImage = null">
        <div class="max-w-4xl max-h-full p-4">
          <img :src="selectedImage" alt="Imagem ampliada" class="max-w-full max-h-full object-contain rounded">
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Propriedade nao encontrada</h1>
        <NuxtLink to="/propriedades" class="btn-primary">Voltar para Propriedades</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { usePropertyStore } from '~/stores/properties'
import { PROPERTY_IMAGE_PLACEHOLDER } from '~/lib/property-utils'

const route = useRoute()
const propertyStore = usePropertyStore()

const property = ref(null)
const isLoading = ref(true)
const loadError = ref('')
const selectedImage = ref(null)

const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const agentPlaceholder = 'https://placehold.co/96x96?text=Agente'

const galleryThumbnails = computed(() => {
  if (!property.value) {
    return []
  }

  return property.value.galleryImages || []
})

const loadProperty = async () => {
  isLoading.value = true
  loadError.value = ''
  submitSuccess.value = false
  submitError.value = ''
  selectedImage.value = null

  try {
    const data = await propertyStore.fetchPropertyById(route.params.id)
    property.value = data
    selectedImage.value = data?.image || PROPERTY_IMAGE_PLACEHOLDER
  } catch (error) {
    console.error('Erro ao carregar propriedade:', error)
    loadError.value = 'Nao foi possivel carregar os detalhes desta propriedade.'
    property.value = null
  } finally {
    isLoading.value = false
  }
}

await loadProperty()

const reload = () => {
  loadProperty()
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price || 0)
}

const submitContact = async () => {
  if (!property.value) {
    return
  }

  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    await $fetch('/api/contacts', {
      method: 'POST',
      body: {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message,
        subject: `Interesse na propriedade ${property.value.title}`,
        propertyId: property.value.id
      }
    })

    submitSuccess.value = true
    contactForm.name = ''
    contactForm.email = ''
    contactForm.phone = ''
    contactForm.message = ''
  } catch (error) {
    console.error('Erro ao enviar contato:', error)
    submitError.value = 'Nao foi possivel enviar sua mensagem. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) {
      await loadProperty()
    }
  }
)

useHead(() => {
  const title = property.value ? `${property.value.title} - Imobiliaria Generica` : 'Propriedade - Imobiliaria Generica'
  const description = property.value?.description || 'Detalhes da propriedade'

  return {
    title,
    meta: [
      { name: 'description', content: description }
    ]
  }
})
</script>
