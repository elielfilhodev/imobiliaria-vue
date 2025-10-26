<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          Estamos aqui para ajudá-lo a encontrar o imóvel dos seus sonhos. Fale conosco!
        </p>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input 
                    v-model="contactForm.name" 
                    type="text" 
                    required
                    class="input-field"
                    placeholder="Seu nome completo"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    v-model="contactForm.email" 
                    type="email" 
                    required
                    class="input-field"
                    placeholder="seu@email.com"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                  <input 
                    v-model="contactForm.phone" 
                    type="tel" 
                    required
                    class="input-field"
                    placeholder="(11) 99999-9999"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
                  <select v-model="contactForm.subject" class="input-field">
                    <option value="">Selecione um assunto</option>
                    <option value="compra">Interesse em Comprar</option>
                    <option value="venda">Quero Vender</option>
                    <option value="locacao">Interesse em Locar</option>
                    <option value="avaliacao">Avaliação de Imóvel</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                <textarea 
                  v-model="contactForm.message" 
                  rows="6"
                  required
                  class="input-field"
                  placeholder="Conte-nos como podemos ajudá-lo..."
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input 
                  v-model="contactForm.newsletter" 
                  type="checkbox" 
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">
                  Quero receber novidades e ofertas por email
                </span>
              </div>
              
              <button type="submit" class="w-full btn-primary text-lg py-3">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
            
            <div class="space-y-8">
              <!-- Office -->
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">Escritório Principal</h3>
                  <p class="text-gray-600 mt-1">
                    Rua das Flores, 123 - Centro<br>
                    São Paulo - SP, 01234-567<br>
                    CEP: 01234-567
                  </p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">Telefone</h3>
                  <p class="text-gray-600 mt-1">
                    (11) 3333-4444<br>
                    (11) 99999-9999 (WhatsApp)
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                  <p class="text-gray-600 mt-1">
                    contato@imobiliaria.com<br>
                    vendas@imobiliaria.com
                  </p>
                </div>
              </div>

              <!-- Hours -->
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">Horário de Funcionamento</h3>
                  <p class="text-gray-600 mt-1">
                    Segunda a Sexta: 8h às 18h<br>
                    Sábado: 8h às 12h<br>
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Siga-nos nas Redes Sociais</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-blue-800 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nossa Localização</h2>
          <p class="text-lg text-gray-600">Venha nos visitar em nosso escritório</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-96 bg-gray-200 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-gray-500">Mapa interativo seria exibido aqui</p>
              <p class="text-sm text-gray-400 mt-2">Rua das Flores, 123 - Centro, São Paulo - SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p class="text-lg text-gray-600">Tire suas dúvidas mais comuns</p>
        </div>
        
        <div class="max-w-3xl mx-auto">
          <div class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Como funciona o processo de compra?</h3>
              <p class="text-gray-600">
                O processo de compra envolve análise de documentação, negociação de preço, 
                financiamento (se necessário) e assinatura do contrato. Nossa equipe te acompanha em cada etapa.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Vocês fazem avaliação de imóveis?</h3>
              <p class="text-gray-600">
                Sim! Oferecemos serviço profissional de avaliação imobiliária com relatórios detalhados 
                e laudos técnicos para venda, financiamento ou inventário.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Qual a taxa de corretagem?</h3>
              <p class="text-gray-600">
                A taxa de corretagem varia conforme o tipo de imóvel e valor. Entre em contato conosco 
                para uma consulta personalizada e sem compromisso.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Oferecem financiamento?</h3>
              <p class="text-gray-600">
                Trabalhamos com os principais bancos e instituições financeiras para facilitar 
                o processo de financiamento imobiliário. Temos parcerias que oferecem condições especiais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const submitContact = () => {
  // Validar dados
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.phone || !contactForm.value.message) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }

  // Simular envio
  console.log('Enviando contato:', contactForm.value)
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
  
  // Limpar formulário
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  }
}

// SEO
useHead({
  title: 'Contato - Imobiliária Genérica',
  meta: [
    { name: 'description', content: 'Entre em contato com a Imobiliária Genérica. Estamos prontos para ajudá-lo a encontrar o imóvel dos seus sonhos.' }
  ]
})
</script>
