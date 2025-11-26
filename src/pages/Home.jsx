import { useState, useEffect } from 'react';
import ProdutoCard from '../components/ProdutoCard';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        return response.json();
      })
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erro!</p>
          <p>{erro}</p>
          <p className="mt-2 text-sm">Certifique-se de que o JSON Server está rodando na porta 3001</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Nossos Produtos</h1>
      
      {produtos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Nenhum produto disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map(produto => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;