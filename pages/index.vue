<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Casas, apartamentos e terrenos com qualidade e confiança
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/propriedades" class="btn-primary text-lg px-8 py-3">
              Ver Propriedades
            </NuxtLink>
            <NuxtLink to="/contato" class="btn-secondary text-lg px-8 py-3">
              Falar Conosco
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Busque por Propriedades</h2>
          <p class="text-lg text-gray-600">Use nossos filtros para encontrar exatamente o que você procura</p>
        </div>
        
        <PropertySearch />
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Propriedades em Destaque</h2>
          <p class="text-lg text-gray-600">Selecionamos as melhores opções para você</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PropertyCard 
            v-for="property in featuredProperties" 
            :key="property.id"
            :property="property"
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/propriedades" class="btn-primary text-lg px-8 py-3">
            Ver Todas as Propriedades
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p class="text-lg text-gray-600">Oferecemos soluções completas para suas necessidades imobiliárias</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Compra e Venda</h3>
            <p class="text-gray-600">Ajudamos você a encontrar o imóvel perfeito ou vender sua propriedade com o melhor preço.</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Locação</h3>
            <p class="text-gray-600">Encontre o imóvel ideal para alugar ou coloque sua propriedade para locação.</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Avaliação</h3>
            <p class="text-gray-600">Serviço profissional de avaliação imobiliária com relatórios detalhados.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">500+</div>
            <div class="text-blue-100">Propriedades Vendidas</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">1000+</div>
            <div class="text-blue-100">Clientes Satisfeitos</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">15</div>
            <div class="text-blue-100">Anos de Experiência</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">24/7</div>
            <div class="text-blue-100">Suporte Disponível</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">O Que Nossos Clientes Dizem</h2>
          <p class="text-lg text-gray-600">Depoimentos de quem confiou em nossos serviços</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 class="font-semibold">Maria Silva</h4>
                <p class="text-gray-600 text-sm">Compradora</p>
              </div>
            </div>
            <p class="text-gray-700">"Excelente atendimento! Encontraram exatamente o que eu procurava e me acompanharam em todo o processo."</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 class="font-semibold">João Santos</h4>
                <p class="text-gray-600 text-sm">Vendedor</p>
              </div>
            </div>
            <p class="text-gray-700">"Vendi minha casa em menos de 30 dias! Profissionais competentes e transparentes."</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 class="font-semibold">Ana Costa</h4>
                <p class="text-gray-600 text-sm">Locatária</p>
              </div>
            </div>
            <p class="text-gray-700">"Encontrei o apartamento perfeito para minha família. Recomendo de olhos fechados!"</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Dados mockados para demonstração
const featuredProperties = ref([
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 'R$ 850.000',
    location: 'Vila Madalena, São Paulo',
    bedrooms: 4,
    bathrooms: 3,
    area: '180m²',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500',
    type: 'Casa',
    featured: true
  },
  {
    id: 2,
    title: 'Apartamento Luxo Centro',
    price: 'R$ 1.200.000',
    location: 'Centro, São Paulo',
    bedrooms: 3,
    bathrooms: 2,
    area: '120m²',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
    type: 'Apartamento',
    featured: true
  },
  {
    id: 3,
    title: 'Cobertura com Vista Mar',
    price: 'R$ 2.500.000',
    location: 'Santos, São Paulo',
    bedrooms: 4,
    bathrooms: 4,
    area: '250m²',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500',
    type: 'Cobertura',
    featured: true
  }
])

// SEO
useHead({
  title: 'Imobiliária Genérica - Encontre o Imóvel dos Seus Sonhos',
  meta: [
    { name: 'description', content: 'Encontre casas, apartamentos e terrenos com qualidade e confiança. A melhor imobiliária da região.' }
  ]
})
</script>
