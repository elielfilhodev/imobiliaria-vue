<template>
  <div class="card hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="imageUrl" 
        :alt="property.title"
        class="w-full h-48 object-cover"
      >
      <div v-if="property.featured" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
        Destaque
      </div>
      <div class="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium">
        {{ typeLabel }}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ property.title }}
      </h3>
      
      <p class="text-gray-600 text-sm mb-3">{{ property.location }}</p>
      
      <div class="flex items-center justify-between mb-3">
        <span class="text-xl font-bold text-blue-600">
          {{ formatPrice(property.price) }}
        </span>
        <span v-if="property.transaction === 'LOCACAO'" class="text-sm text-gray-500">/mes</span>
      </div>
      
      <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
          {{ property.bedrooms || 0 }} quartos
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z" />
          </svg>
          {{ property.bathrooms || 0 }} banheiros
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          {{ property.area || 0 }}m2
        </div>
      </div>
      
      <NuxtLink 
        :to="`/propriedades/${property.id}`"
        class="w-full btn-primary text-center block"
      >
        Ver Detalhes
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PROPERTY_IMAGE_PLACEHOLDER, getTypeLabel } from '~/lib/property-utils'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const imageUrl = computed(() => {
  const mainImage = props.property?.image
  const galleryFallback = props.property?.mainImage?.url || props.property?.images?.[0]?.url
  return mainImage || galleryFallback || PROPERTY_IMAGE_PLACEHOLDER
})

const typeLabel = computed(() => {
  return props.property?.displayType || getTypeLabel(props.property?.type)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price || 0)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
