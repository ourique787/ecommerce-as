import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Página não encontrada</h1>
        <p className="text-gray-600 text-lg mb-8">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;