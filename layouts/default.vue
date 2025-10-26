<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">I</span>
              </div>
              <span class="text-xl font-bold text-gray-900">Imobiliária Genérica</span>
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Início
            </NuxtLink>
            <NuxtLink to="/propriedades" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Propriedades
            </NuxtLink>
            <NuxtLink to="/sobre" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sobre
            </NuxtLink>
            <NuxtLink to="/contato" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contato
            </NuxtLink>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Início
            </NuxtLink>
            <NuxtLink to="/propriedades" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Propriedades
            </NuxtLink>
            <NuxtLink to="/sobre" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Sobre
            </NuxtLink>
            <NuxtLink to="/contato" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Contato
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">I</span>
              </div>
              <span class="text-xl font-bold">Imobiliária Genérica</span>
            </div>
            <p class="text-gray-300 mb-4">
              Encontre o imóvel dos seus sonhos com a melhor imobiliária da região. 
              Oferecemos casas, apartamentos e terrenos com qualidade e confiança.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/propriedades" class="text-gray-300 hover:text-white transition-colors">Propriedades</NuxtLink></li>
              <li><NuxtLink to="/sobre" class="text-gray-300 hover:text-white transition-colors">Sobre Nós</NuxtLink></li>
              <li><NuxtLink to="/contato" class="text-gray-300 hover:text-white transition-colors">Contato</NuxtLink></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <!-- Contact info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contato</h3>
            <div class="space-y-2 text-gray-300">
              <p>📞 (11) 9999-9999</p>
              <p>✉️ contato@imobiliaria.com</p>
              <p>📍 Rua das Flores, 123<br>São Paulo - SP</p>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700">
          <p class="text-center text-gray-300">
            © 2024 Imobiliária Genérica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
