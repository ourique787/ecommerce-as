import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getQuantidadeNoCarrinho } = useCart();
  
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        return response.json();
      })
      .then(data => {
        setProduto(data);
        setLoading(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const quantidadeNoCarrinho = getQuantidadeNoCarrinho(produto.id);
    
    if (quantidadeNoCarrinho >= produto.estoque) {
      setMensagem('Estoque máximo atingido!');
      setTimeout(() => setMensagem(''), 3000);
      return;
    }

    addToCart(produto);
    setMensagem('Produto adicionado ao carrinho!');
    setTimeout(() => setMensagem(''), 3000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erro!</p>
          <p>{erro || 'Produto não encontrado'}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  const quantidadeNoCarrinho = getQuantidadeNoCarrinho(produto.id);
  const podeAdicionar = produto.estoque > 0 && quantidadeNoCarrinho < produto.estoque;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Voltar para produtos
      </button>

      {mensagem && (
        <div className={`mb-4 p-4 rounded ${
          mensagem.includes('máximo') 
            ? 'bg-yellow-100 border border-yellow-400 text-yellow-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {mensagem}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
        <div className="rounded-lg overflow-hidden bg-gray-200">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {produto.nome}
            </h1>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {produto.descricao}
            </p>

            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600 mb-4">
                R$ {produto.preco.toFixed(2)}
              </p>

              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full font-semibold ${
                  produto.estoque === 0
                    ? 'bg-red-100 text-red-600'
                    : produto.estoque <= 5
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  {produto.estoque === 0 
                    ? 'Esgotado' 
                    : `Estoque: ${produto.estoque} unidades`
                  }
                </span>

                {quantidadeNoCarrinho > 0 && (
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
                    {quantidadeNoCarrinho} no carrinho
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            {!podeAdicionar && produto.estoque > 0 && (
              <p className="text-red-600 font-semibold mb-4">
                ⚠️ Estoque máximo atingido
              </p>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!podeAdicionar}
              className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                podeAdicionar
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {produto.estoque === 0
                ? 'Produto Esgotado'
                : !podeAdicionar
                ? 'Estoque Máximo no Carrinho'
                : 'Adicionar ao Carrinho'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProduto;