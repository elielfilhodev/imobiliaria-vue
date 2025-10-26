import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar agentes
  const agent1 = await prisma.agent.upsert({
    where: { creci: '12345' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'joao@imobiliaria.com',
      phone: '(11) 99999-9999',
      creci: '12345',
      bio: 'Especialista em imóveis residenciais com mais de 10 anos de experiência.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      active: true
    }
  })

  const agent2 = await prisma.agent.upsert({
    where: { creci: '67890' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'maria@imobiliaria.com',
      phone: '(11) 88888-8888',
      creci: '67890',
      bio: 'Especialista em apartamentos de luxo e investimentos imobiliários.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      active: true
    }
  })

  const agent3 = await prisma.agent.upsert({
    where: { creci: '11111' },
    update: {},
    create: {
      name: 'Pedro Costa',
      email: 'pedro@imobiliaria.com',
      phone: '(11) 77777-7777',
      creci: '11111',
      bio: 'Especialista em imóveis de alto padrão e coberturas.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      active: true
    }
  })

  console.log('✅ Agentes criados')

  // Criar propriedades
  const property1 = await prisma.property.create({
    data: {
      title: 'Casa Moderna com Piscina',
      description: 'Linda casa moderna com piscina, ideal para famílias que buscam conforto e qualidade de vida. Localizada em um dos bairros mais desejados de São Paulo, oferece fácil acesso a shoppings, escolas e transporte público.',
      price: 850000,
      location: 'Vila Madalena, São Paulo',
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      parking: 2,
      type: 'CASA',
      transaction: 'VENDA',
      status: 'AVAILABLE',
      featured: true,
      agentId: agent1.id
    }
  })

  const property2 = await prisma.property.create({
    data: {
      title: 'Apartamento Luxo Centro',
      description: 'Apartamento de luxo no centro da cidade com vista panorâmica e todas as comodidades.',
      price: 1200000,
      location: 'Centro, São Paulo',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      parking: 1,
      floor: 15,
      condoFee: 800,
      type: 'APARTAMENTO',
      transaction: 'VENDA',
      status: 'SOLD',
      featured: true,
      agentId: agent2.id
    }
  })

  const property3 = await prisma.property.create({
    data: {
      title: 'Cobertura com Vista Mar',
      description: 'Cobertura de luxo com vista para o mar e todas as comodidades. Ideal para quem busca exclusividade e conforto.',
      price: 2500000,
      location: 'Santos, São Paulo',
      bedrooms: 4,
      bathrooms: 4,
      area: 250,
      parking: 3,
      floor: 20,
      condoFee: 1200,
      type: 'COBERTURA',
      transaction: 'VENDA',
      status: 'AVAILABLE',
      featured: true,
      agentId: agent3.id
    }
  })

  const property4 = await prisma.property.create({
    data: {
      title: 'Casa Familiar Jardim',
      description: 'Casa aconchegante com jardim, perfeita para famílias que valorizam o espaço e a tranquilidade.',
      price: 650000,
      location: 'Jardins, São Paulo',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      parking: 2,
      type: 'CASA',
      transaction: 'VENDA',
      status: 'RENTED',
      featured: false,
      agentId: agent1.id
    }
  })

  const property5 = await prisma.property.create({
    data: {
      title: 'Apartamento Compacto',
      description: 'Apartamento compacto e funcional, ideal para jovens profissionais ou casais.',
      price: 450000,
      location: 'Mooca, São Paulo',
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      parking: 1,
      floor: 8,
      condoFee: 400,
      type: 'APARTAMENTO',
      transaction: 'VENDA',
      status: 'AVAILABLE',
      featured: false,
      agentId: agent2.id
    }
  })

  console.log('✅ Propriedades criadas')

  // Criar características das propriedades
  const features1 = await prisma.propertyFeature.createMany({
    data: [
      { name: 'Piscina', propertyId: property1.id },
      { name: 'Jardim', propertyId: property1.id },
      { name: 'Garagem para 2 carros', propertyId: property1.id },
      { name: 'Churrasqueira', propertyId: property1.id },
      { name: 'Sala de estar ampla', propertyId: property1.id },
      { name: 'Cozinha planejada', propertyId: property1.id },
      { name: 'Área de serviço', propertyId: property1.id },
      { name: 'Quarto master com closet', propertyId: property1.id }
    ]
  })

  const features2 = await prisma.propertyFeature.createMany({
    data: [
      { name: 'Elevador', propertyId: property2.id },
      { name: 'Portaria 24h', propertyId: property2.id },
      { name: 'Academia', propertyId: property2.id },
      { name: 'Salão de festas', propertyId: property2.id },
      { name: 'Piscina', propertyId: property2.id },
      { name: 'Vista panorâmica', propertyId: property2.id }
    ]
  })

  const features3 = await prisma.propertyFeature.createMany({
    data: [
      { name: 'Vista Mar', propertyId: property3.id },
      { name: 'Terraço', propertyId: property3.id },
      { name: 'Piscina', propertyId: property3.id },
      { name: 'Elevador', propertyId: property3.id },
      { name: 'Portaria 24h', propertyId: property3.id },
      { name: 'Academia', propertyId: property3.id },
      { name: 'Spa', propertyId: property3.id },
      { name: 'Heliponto', propertyId: property3.id }
    ]
  })

  console.log('✅ Características das propriedades criadas')

  // Criar imagens das propriedades
  const images1 = await prisma.image.createMany({
    data: [
      { 
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 
        alt: 'Casa moderna vista frontal',
        type: 'MAIN',
        order: 1,
        propertyId: property1.id 
      },
      { 
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 
        alt: 'Piscina da casa',
        type: 'GALLERY',
        order: 2,
        propertyId: property1.id 
      },
      { 
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 
        alt: 'Jardim da casa',
        type: 'GALLERY',
        order: 3,
        propertyId: property1.id 
      },
      { 
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', 
        alt: 'Sala de estar',
        type: 'GALLERY',
        order: 4,
        propertyId: property1.id 
      }
    ]
  })

  const images2 = await prisma.image.createMany({
    data: [
      { 
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 
        alt: 'Apartamento luxo',
        type: 'MAIN',
        order: 1,
        propertyId: property2.id 
      },
      { 
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 
        alt: 'Vista panorâmica',
        type: 'GALLERY',
        order: 2,
        propertyId: property2.id 
      }
    ]
  })

  const images3 = await prisma.image.createMany({
    data: [
      { 
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 
        alt: 'Cobertura vista mar',
        type: 'MAIN',
        order: 1,
        propertyId: property3.id 
      },
      { 
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', 
        alt: 'Terraço da cobertura',
        type: 'GALLERY',
        order: 2,
        propertyId: property3.id 
      }
    ]
  })

  console.log('✅ Imagens das propriedades criadas')

  // Criar contatos
  const contacts = await prisma.contact.createMany({
    data: [
      {
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-9999',
        message: 'Olá, estou interessada na casa da Vila Madalena. Gostaria de agendar uma visita para conhecer melhor a propriedade.',
        subject: 'Interesse em Comprar',
        status: 'UNREAD',
        read: false,
        propertyId: property1.id
      },
      {
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '(11) 88888-8888',
        message: 'Preciso de mais informações sobre o apartamento do centro. Qual o valor do condomínio?',
        subject: 'Informações sobre Propriedade',
        status: 'READ',
        read: true,
        propertyId: property2.id
      },
      {
        name: 'Ana Costa',
        email: 'ana@email.com',
        phone: '(11) 77777-7777',
        message: 'A cobertura tem vista para o mar mesmo? E qual o valor do IPTU?',
        subject: 'Dúvidas sobre Propriedade',
        status: 'RESPONDED',
        read: true,
        propertyId: property3.id
      }
    ]
  })

  console.log('✅ Contatos criados')

  // Criar usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@imobiliaria.com' },
    update: {},
    create: {
      email: 'admin@imobiliaria.com',
      password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJapJj3p8p8p8p8p8p8', // password: admin123
      name: 'Administrador',
      role: 'ADMIN',
      active: true
    }
  })

  console.log('✅ Usuário admin criado')

  // Criar configurações do site
  const siteConfigs = await prisma.siteConfig.createMany({
    data: [
      { key: 'site_name', value: 'Imobiliária Genérica', description: 'Nome do site' },
      { key: 'site_description', value: 'Encontre o imóvel dos seus sonhos com a melhor imobiliária da região', description: 'Descrição do site' },
      { key: 'contact_email', value: 'contato@imobiliaria.com', description: 'Email de contato' },
      { key: 'contact_phone', value: '(11) 3333-4444', description: 'Telefone de contato' },
      { key: 'contact_whatsapp', value: '(11) 99999-9999', description: 'WhatsApp de contato' },
      { key: 'contact_address', value: 'Rua das Flores, 123 - Centro, São Paulo - SP', description: 'Endereço da empresa' },
      { key: 'social_facebook', value: '#', description: 'Link do Facebook' },
      { key: 'social_instagram', value: '#', description: 'Link do Instagram' },
      { key: 'social_twitter', value: '#', description: 'Link do Twitter' },
      { key: 'business_hours_weekdays', value: '8h às 18h', description: 'Horário de funcionamento - dias úteis' },
      { key: 'business_hours_saturday', value: '8h às 12h', description: 'Horário de funcionamento - sábado' },
      { key: 'business_hours_sunday', value: 'Fechado', description: 'Horário de funcionamento - domingo' }
    ]
  })

  console.log('✅ Configurações do site criadas')

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
