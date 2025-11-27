# 🛒 Mini E-commerce com React

Projeto de e-commerce desenvolvido com React, React Router, Context API e TailwindCSS.

---

## 🚀 Tecnologias

- React 19.2.0 | React Router DOM 7.9.6 | Context API
- TailwindCSS 3 | JSON Server 0.17.4 | Vite 7.2.4

---

## 🎯 Funcionalidades

- Listagem de produtos
- Detalhes do produto
- Carrinho de compras com validação de estoque
- Adicionar, aumentar, diminuir e remover itens
- Cadastro de novos produtos com validações
- Navegação entre páginas
- Página 404

---

## 🧩 Context API

### Como foi Criado

1. `createContext()` - Criação do contexto
2. `CartProvider` - Provider que envolve a aplicação
3. `useCart()` - Hook customizado para consumir

### Dados Armazenados

Array `cartItems` com: id, nome, descrição, preço, imagem, estoque e **quantidade**.

### Principais Funções

- `addToCart()` - Adiciona produtos
- `removeFromCart()` - Remove produtos
- `aumentarQuantidade()` / `diminuirQuantidade()` - Ajusta quantidades
- `getTotalCarrinho()` - Calcula total
- `getQuantidadeItens()` - Conta itens

### Onde é Usado

- **Header** - Badge com total de itens
- **DetalhesProduto** - Adicionar ao carrinho e validar estoque
- **Carrinho** - Gerenciar todos os itens

---

## 🌐 API (JSON Server)

### Configuração

- **Arquivo:** `db.json` (raiz)
- **Porta:** 3001
- **Comando:** `npm run server`

### Endpoints

- `GET /produtos` - Lista produtos (Home)
- `GET /produtos/:id` - Busca por ID (Detalhes)
- `POST /produtos` - Cria produto (Cadastro)

### Exemplos de Requisições
```javascript
// GET - Listar
fetch('http://localhost:3001/produtos')
  .then(res => res.json())
  .then(data => setProdutos(data))

// POST - Criar
fetch('http://localhost:3001/produtos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(produto)
})
```

### Tratamento de Erros

- Estado `loading` com spinner animado
- Estado `erro` com mensagens amigáveis
- Try-catch em todas as requisições

---

## 📁 Estrutura do Projeto
```
mini-ecommerce/
├── src/
│   ├── components/     # Header, ProdutoCard
│   ├── context/        # CartContext
│   ├── pages/          # Home, DetalhesProduto, Carrinho,
│   │                   # CadastroProduto, NotFound
│   ├── App.jsx
│   └── main.jsx
├── db.json
└── package.json
```

### Páginas

1. **Home (/)** - Lista produtos da API
2. **DetalhesProduto (/produto/:id)** - Detalhes + adicionar ao carrinho
3. **Carrinho (/carrinho)** - Gerencia itens e calcula total
4. **CadastroProduto (/cadastro)** - Formulário com validações
5. **NotFound (*)** - Página 404

### Fluxo de Navegação

Home → Ver Detalhes → Adicionar ao Carrinho → Carrinho  
Header → Cadastrar → Salvar → Home

---

## ✨ Validação de Estoque

**DetalhesProduto:**
- Verifica quantidade no carrinho antes de adicionar
- Desabilita botão quando `quantidadeNoCarrinho >= estoque`
- Exibe mensagem "Estoque máximo atingido"

**Carrinho:**
- Botão "+" desabilitado ao atingir limite
- Alerta ao tentar ultrapassar estoque

**Resultado:** Impossível adicionar mais que o estoque disponível.

---

## 📝 Formulário de Cadastro

**Validações:**
- Nome e descrição obrigatórios
- Preço: número ≥ 0
- URL: deve começar com http:// ou https://
- Estoque: inteiro ≥ 0

**useRef:** Foca automaticamente no primeiro campo inválido.

**Fluxo:** Valida → Mostra erros → Foca no erro → POST na API → Redireciona para Home

---

## 🎨 Hooks Utilizados

- **useState** - Estados locais
- **useEffect** - Chamadas à API
- **useContext** - Acesso ao CartContext
- **useRef** - Foco em campos inválidos
- **useParams** - ID da URL
- **useNavigate** - Redirecionamentos

---

## 📦 Como Rodar
```bash
# Instalar dependências
npm install

# Terminal 1 - JSON Server
npm run server

# Terminal 2 - React
npm run dev
```

**Acessar:**
- Frontend: http://localhost:5173
- API: http://localhost:3001

**Dependências:** react, react-dom, react-router-dom, tailwindcss, json-server, vite

---

**Desenvolvido para avaliação prática AS**
