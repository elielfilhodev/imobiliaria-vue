# Site da Imobiliária Genérica

Um site completo para imobiliária desenvolvido com Nuxt 3 e Vue 3, totalmente responsivo e com duas áreas distintas: cliente e administração.

## 🚀 Funcionalidades

### Área do Cliente
- **Homepage** com propriedades em destaque
- **Catálogo de propriedades** com filtros avançados
- **Detalhes das propriedades** com galeria de imagens
- **Sistema de busca** por localização, preço, características
- **Página sobre** com informações da empresa
- **Página de contato** com formulário e informações
- **Design totalmente responsivo**

### Área Administrativa
- **Dashboard** com estatísticas e resumo
- **Gerenciamento de propriedades** (CRUD completo)
- **Galeria de imagens** com upload e organização
- **Gerenciamento de contatos** recebidos
- **Sistema de filtros** e busca avançada
- **Interface administrativa** intuitiva

## 🛠️ Tecnologias Utilizadas

- **Nuxt 3** - Framework Vue.js
- **Vue 3** - Framework JavaScript
- **Tailwind CSS** - Framework CSS
- **Pinia** - Gerenciamento de estado
- **TypeScript** - Tipagem estática
- **Headless UI** - Componentes acessíveis
- **Heroicons** - Ícones SVG

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd imobiliaria-site
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse o site**
- Cliente: http://localhost:3000
- Admin: http://localhost:3000/admin

## 🏗️ Estrutura do Projeto

```
├── assets/                 # Arquivos estáticos
│   └── css/               # Estilos CSS
├── components/            # Componentes reutilizáveis
│   ├── PropertyCard.vue   # Card de propriedade
│   └── PropertySearch.vue # Componente de busca
├── layouts/              # Layouts da aplicação
│   ├── default.vue       # Layout do cliente
│   └── admin.vue         # Layout do admin
├── pages/                # Páginas da aplicação
│   ├── index.vue         # Homepage
│   ├── propriedades/     # Páginas de propriedades
│   ├── sobre.vue         # Página sobre
│   ├── contato.vue       # Página de contato
│   └── admin/            # Páginas administrativas
├── stores/               # Stores do Pinia
│   ├── app.js           # Store geral
│   ├── properties.js    # Store de propriedades
│   ├── contacts.js      # Store de contatos
│   └── images.js        # Store de imagens
├── nuxt.config.ts       # Configuração do Nuxt
└── package.json         # Dependências do projeto
```

## 🎨 Design Responsivo

O site foi desenvolvido com foco na responsividade, utilizando:
- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints** do Tailwind CSS
- **Grid System** flexível
- **Componentes adaptativos**
- **Navegação mobile** com menu hambúrguer

## 📱 Páginas Principais

### Cliente
- `/` - Homepage com propriedades em destaque
- `/propriedades` - Catálogo com filtros
- `/propriedades/[id]` - Detalhes da propriedade
- `/sobre` - Informações da empresa
- `/contato` - Formulário de contato

### Admin
- `/admin` - Dashboard principal
- `/admin/propriedades` - Lista de propriedades
- `/admin/propriedades/nova` - Cadastro de propriedade
- `/admin/galeria` - Gerenciamento de imagens
- `/admin/contatos` - Mensagens recebidas

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3000/api
NUXT_PUBLIC_SITE_NAME=Imobiliária Genérica
NUXT_PUBLIC_CONTACT_EMAIL=contato@imobiliaria.com
NUXT_PUBLIC_CONTACT_PHONE=(11) 3333-4444
```

### Personalização
- **Cores**: Edite o arquivo `assets/css/main.css`
- **Configurações**: Modifique `stores/app.js`
- **Dados**: Atualize os stores em `stores/`

## 📊 Gerenciamento de Estado

O projeto utiliza **Pinia** para gerenciamento de estado:

- **`app.js`** - Configurações gerais e utilitários
- **`properties.js`** - Propriedades e filtros
- **`contacts.js`** - Contatos e mensagens
- **`images.js`** - Galeria de imagens

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Deploy Estático
```bash
npm run generate
```

## 📈 Funcionalidades Futuras

- [ ] Sistema de autenticação
- [ ] Integração com APIs reais
- [ ] Sistema de notificações
- [ ] Chat em tempo real
- [ ] Relatórios avançados
- [ ] Sistema de avaliações
- [ ] Integração com mapas
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato:
- Email: contato@imobiliaria.com
- Telefone: (11) 3333-4444

---

Desenvolvido com ❤️ para a Imobiliária Genérica
