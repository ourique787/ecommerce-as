# 🛒 Mini E-commerce com React

Projeto de e-commerce desenvolvido com React, React Router, Context API e TailwindCSS.

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

O **CartContext** gerencia globalmente o carrinho de compras, evitando prop drilling.

**Principais funções:**
- `addToCart()` - Adiciona produtos
- `removeFromCart()` - Remove produtos
- `aumentarQuantidade()` / `diminuirQuantidade()` - Ajusta quantidades
- `getTotalCarrinho()` - Calcula total
- `getQuantidadeItens()` - Conta itens

**Onde é usado:**
- **Header** - Badge com total de itens
- **DetalhesProduto** - Adicionar ao carrinho
- **Carrinho** - Gerenciar todos os itens

---

## 🌐 API (JSON Server)

**Base URL:** `http://localhost:3001`

**Endpoints:**
- `GET /produtos` - Lista produtos (Home)
- `GET /produtos/:id` - Busca por ID (Detalhes)
- `POST /produtos` - Cria produto (Cadastro)

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

---

## ✅ Requisitos Atendidos

✅ Listagem e detalhes de produtos  
✅ Carrinho com Context API  
✅ Validação de estoque  
✅ CRUD de produtos (sem edição)  
✅ Validações de formulário  
✅ React Router  
✅ Estilização com Tailwind  
✅ Página 404  

---

**Desenvolvido para avaliação prática AS**
