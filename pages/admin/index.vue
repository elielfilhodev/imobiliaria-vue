<template>
  <div>
    <!-- Dashboard Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-2">Visão geral das atividades da imobiliária</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total de Propriedades</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProperties }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Propriedades Vendidas</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.soldProperties }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Contatos Recebidos</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalContacts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Faturamento Mensal</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.monthlyRevenue) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Properties -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Propriedades Recentes</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="property in recentProperties" :key="property.id" class="flex items-center space-x-4">
              <img :src="property.image" :alt="property.title" class="w-16 h-16 object-cover rounded-lg">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900 truncate">{{ property.title }}</h3>
                <p class="text-sm text-gray-500">{{ property.location }}</p>
                <p class="text-sm font-medium text-blue-600">{{ formatCurrency(property.price) }}</p>
              </div>
              <div class="flex space-x-2">
                <NuxtLink :to="`/admin/propriedades/${property.id}/editar`" class="text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button @click="deleteProperty(property.id)" class="text-red-600 hover:text-red-800">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/admin/propriedades" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas as propriedades →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Contacts -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Contatos Recentes</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="contact in recentContacts" :key="contact.id" class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-gray-700">{{ contact.name.charAt(0) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900">{{ contact.name }}</h3>
                <p class="text-sm text-gray-500">{{ contact.email }}</p>
                <p class="text-sm text-gray-600 truncate">{{ contact.message }}</p>
              </div>
              <div class="text-sm text-gray-500">
                {{ formatDate(contact.createdAt) }}
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/admin/contatos" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todos os contatos →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/admin/propriedades/nova" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="p-2 bg-blue-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Nova Propriedade</h3>
            <p class="text-sm text-gray-600">Cadastrar um novo imóvel</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/galeria" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="p-2 bg-green-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Gerenciar Galeria</h3>
            <p class="text-sm text-gray-600">Organizar fotos das propriedades</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/contatos" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="p-2 bg-purple-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Ver Contatos</h3>
            <p class="text-sm text-gray-600">Gerenciar mensagens recebidas</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Dados mockados para demonstração
const stats = ref({
  totalProperties: 45,
  soldProperties: 12,
  totalContacts: 28,
  monthlyRevenue: 125000
})

const recentProperties = ref([
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    location: 'Vila Madalena, São Paulo',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Apartamento Luxo Centro',
    location: 'Centro, São Paulo',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Cobertura com Vista Mar',
    location: 'Santos, São Paulo',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100',
    createdAt: '2024-01-13'
  }
])

const recentContacts = ref([
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    message: 'Interessada na casa da Vila Madalena',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    message: 'Gostaria de agendar uma visita',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana@email.com',
    message: 'Preciso de mais informações sobre o apartamento',
    createdAt: '2024-01-14T16:45:00Z'
  }
])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const deleteProperty = (id) => {
  if (confirm('Tem certeza que deseja excluir esta propriedade?')) {
    // Implementar exclusão
    console.log('Excluindo propriedade:', id)
  }
}
</script>
