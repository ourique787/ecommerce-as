import { Link } from 'react-router-dom';

function ProdutoCard({ produto }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden bg-gray-200">
        <img 
          src={produto.imagem} 
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {produto.nome}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            R$ {produto.preco.toFixed(2)}
          </span>
          
          {produto.estoque === 0 ? (
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              Esgotado
            </span>
          ) : (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Estoque: {produto.estoque}
            </span>
          )}
        </div>
        
        <Link
          to={`/produto/${produto.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}

export default ProdutoCard;