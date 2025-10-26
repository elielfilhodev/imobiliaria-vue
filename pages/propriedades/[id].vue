<template>
  <div v-if="property">
    <!-- Property Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <NuxtLink to="/" class="hover:text-gray-700">Início</NuxtLink>
          <span>/</span>
          <NuxtLink to="/propriedades" class="hover:text-gray-700">Propriedades</NuxtLink>
          <span>/</span>
          <span class="text-gray-900">{{ property.title }}</span>
        </nav>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ property.title }}</h1>
        <p class="text-lg text-gray-600">{{ property.location }}</p>
        <div class="flex items-center mt-4">
          <span class="text-3xl font-bold text-blue-600">{{ formatPrice(property.price) }}</span>
          <span v-if="property.type === 'locacao'" class="ml-2 text-gray-600">/mês</span>
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
                :src="property.image" 
                :alt="property.title"
                class="w-full h-96 object-cover rounded-lg shadow-md"
              >
              <div v-if="property.featured" class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destaque
              </div>
            </div>
            
            <!-- Additional Images -->
            <div v-if="property.gallery && property.gallery.length > 0" class="grid grid-cols-4 gap-2 mt-4">
              <img 
                v-for="(image, index) in property.gallery.slice(0, 4)" 
                :key="index"
                :src="image" 
                :alt="`${property.title} - Imagem ${index + 2}`"
                class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                @click="selectedImage = image"
              >
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
                <div class="text-lg font-semibold">{{ property.bedrooms }}</div>
                <div class="text-sm text-gray-600">Quartos</div>
              </div>
              
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z" />
                </svg>
                <div class="text-lg font-semibold">{{ property.bathrooms }}</div>
                <div class="text-sm text-gray-600">Banheiros</div>
              </div>
              
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <div class="text-lg font-semibold">{{ property.area }}m²</div>
                <div class="text-sm text-gray-600">Área Total</div>
              </div>
              
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <svg class="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div class="text-lg font-semibold">{{ property.parking || 0 }}</div>
                <div class="text-sm text-gray-600">Vagas</div>
              </div>
            </div>

            <!-- Description -->
            <div v-if="property.description">
              <h3 class="text-lg font-semibold mb-2">Descrição</h3>
              <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
            </div>
          </div>

          <!-- Features -->
          <div v-if="property.features && property.features.length > 0" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">Características</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div v-for="feature in property.features" :key="feature" class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-4">Localização</h2>
            <div class="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Mapa interativo seria exibido aqui</p>
            </div>
            <p class="mt-4 text-gray-700">{{ property.location }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-8">
            <h3 class="text-xl font-semibold mb-4">Interessado nesta propriedade?</h3>
            <form @submit.prevent="submitContact" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input 
                  v-model="contactForm.name" 
                  type="text" 
                  required
                  class="input-field"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="contactForm.email" 
                  type="email" 
                  required
                  class="input-field"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input 
                  v-model="contactForm.phone" 
                  type="tel" 
                  required
                  class="input-field"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea 
                  v-model="contactForm.message" 
                  rows="4"
                  class="input-field"
                  placeholder="Conte-nos sobre seu interesse..."
                ></textarea>
              </div>
              
              <button type="submit" class="w-full btn-primary">
                Enviar Interesse
              </button>
            </form>
          </div>

          <!-- Agent Info -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">Corretor Responsável</h3>
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 class="font-semibold">{{ property.agent?.name || 'João Silva' }}</h4>
                <p class="text-gray-600 text-sm">CRECI: {{ property.agent?.creci || '12345' }}</p>
              </div>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ property.agent?.phone || '(11) 99999-9999' }}</span>
              </div>
              
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ property.agent?.email || 'joao@imobiliaria.com' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="selectedImage = null">
      <div class="max-w-4xl max-h-full p-4">
        <img :src="selectedImage" alt="Imagem ampliada" class="max-w-full max-h-full object-contain">
      </div>
    </div>
  </div>
  
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1>
      <NuxtLink to="/propriedades" class="btn-primary">Voltar para Propriedades</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const propertyId = route.params.id

// Dados mockados para demonstração
const properties = [
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 850000,
    location: 'Vila Madalena, São Paulo',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    type: 'casa',
    featured: true,
    parking: 2,
    description: 'Linda casa moderna com piscina, ideal para famílias que buscam conforto e qualidade de vida. Localizada em um dos bairros mais desejados de São Paulo, oferece fácil acesso a shoppings, escolas e transporte público.',
    features: [
      'Piscina',
      'Jardim',
      'Garagem para 2 carros',
      'Churrasqueira',
      'Sala de estar ampla',
      'Cozinha planejada',
      'Área de serviço',
      'Quarto master com closet'
    ],
    agent: {
      name: 'João Silva',
      creci: '12345',
      phone: '(11) 99999-9999',
      email: 'joao@imobiliaria.com'
    }
  }
]

const property = computed(() => {
  return properties.find(p => p.id === parseInt(propertyId))
})

const selectedImage = ref(null)
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const submitContact = () => {
  // Implementar envio do formulário
  alert('Interesse enviado com sucesso! Entraremos em contato em breve.')
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}

// SEO
useHead({
  title: property.value ? `${property.value.title} - Imobiliária Genérica` : 'Propriedade - Imobiliária Genérica',
  meta: [
    { name: 'description', content: property.value ? property.value.description : 'Detalhes da propriedade' }
  ]
})
</script>
