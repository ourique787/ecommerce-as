import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from './pages/Carrinho';
import CadastroProduto from './pages/CadastroProduto';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<DetalhesProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/cadastro" element={<CadastroProduto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;