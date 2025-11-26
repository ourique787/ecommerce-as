import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
  const {
    cartItems,
    removeFromCart,
    aumentarQuantidade,
    diminuirQuantidade,
    getTotalCarrinho
  } = useCart();
  
  const navigate = useNavigate();

  const handleAumentar = (item) => {
    if (item.quantidade >= item.estoque) {
      alert('Estoque máximo atingido!');
      return;
    }
    aumentarQuantidade(item.id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrinho de Compras</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 mb-6">
            Adicione produtos ao carrinho para continuar comprando
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Ir para produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrinho de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4"
            >
              <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.nome}
                </h3>
                
                <p className="text-gray-600 mb-2">
                  Preço unitário: <span className="font-semibold">R$ {item.preco.toFixed(2)}</span>
                </p>
                
                <p className="text-sm text-gray-500 mb-4">
                  Estoque disponível: {item.estoque} unidades
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() => diminuirQuantidade(item.id)}
                      className="bg-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 transition font-bold text-lg"
                    >
                      -
                    </button>
                    
                    <span className="font-semibold min-w-[30px] text-center">
                      {item.quantidade}
                    </span>
                    
                    <button
                      onClick={() => handleAumentar(item)}
                      disabled={item.quantidade >= item.estoque}
                      className={`w-8 h-8 rounded flex items-center justify-center font-bold text-lg transition ${
                        item.quantidade >= item.estoque
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-white hover:bg-gray-200'
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    Remover
                  </button>
                </div>

                {item.quantidade >= item.estoque && (
                  <p className="text-yellow-600 text-sm mt-2 font-semibold">
                    ⚠️ Quantidade máxima atingida
                  </p>
                )}
              </div>

              <div className="text-right md:text-left">
                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {getTotalCarrinho().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-blue-600">R$ {getTotalCarrinho().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg mb-3">
              Finalizar Compra
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;