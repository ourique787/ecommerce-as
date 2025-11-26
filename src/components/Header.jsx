import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { getQuantidadeItens } = useCart();
  const totalItens = getQuantidadeItens();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
            🛒 Mini E-commerce
          </Link>
          
          <nav className="flex gap-6 items-center">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition font-medium"
            >
              Home
            </Link>
            
            <Link 
              to="/cadastro" 
              className="hover:text-blue-200 transition font-medium"
            >
              Cadastrar Produto
            </Link>
            
            <Link 
              to="/carrinho" 
              className="relative bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Carrinho
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {totalItens}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;