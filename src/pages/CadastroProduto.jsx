import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const nomeRef = useRef(null);
  const descricaoRef = useRef(null);
  const precoRef = useRef(null);
  const imagemRef = useRef(null);
  const estoqueRef = useRef(null);

  const refs = {
    nome: nomeRef,
    descricao: descricaoRef,
    preco: precoRef,
    imagem: imagemRef,
    estoque: estoqueRef
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!formData.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!formData.preco) {
      novosErros.preco = 'Preço é obrigatório';
    } else if (isNaN(formData.preco) || Number(formData.preco) < 0) {
      novosErros.preco = 'Preço deve ser um número maior ou igual a 0';
    }

    if (!formData.imagem.trim()) {
      novosErros.imagem = 'URL da imagem é obrigatória';
    } else if (!formData.imagem.match(/^https?:\/\/.+/)) {
      novosErros.imagem = 'URL da imagem deve ser válida (começar com http:// ou https://)';
    }

    if (!formData.estoque) {
      novosErros.estoque = 'Estoque é obrigatório';
    } else if (isNaN(formData.estoque) || Number(formData.estoque) < 0 || !Number.isInteger(Number(formData.estoque))) {
      novosErros.estoque = 'Estoque deve ser um número inteiro maior ou igual a 0';
    }

    setErrors(novosErros);

    if (Object.keys(novosErros).length > 0) {
      const primeiroCampoComErro = Object.keys(novosErros)[0];
      refs[primeiroCampoComErro].current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    const produto = {
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim(),
      preco: Number(formData.preco),
      imagem: formData.imagem.trim(),
      estoque: Number(formData.estoque)
    };

    try {
      const response = await fetch('http://localhost:3001/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto');
      }

      alert('Produto cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao cadastrar produto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Cadastrar Novo Produto</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="nome" className="block text-gray-700 font-semibold mb-2">
              Nome do Produto *
            </label>
            <input
              ref={nomeRef}
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nome
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ex: Notebook Dell Inspiron"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="descricao" className="block text-gray-700 font-semibold mb-2">
              Descrição *
            </label>
            <textarea
              ref={descricaoRef}
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.descricao
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Descreva o produto..."
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="preco" className="block text-gray-700 font-semibold mb-2">
                Preço (R$) *
              </label>
              <input
                ref={precoRef}
                type="number"
                step="0.01"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.preco
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="0.00"
              />
              {errors.preco && (
                <p className="text-red-500 text-sm mt-1">{errors.preco}</p>
              )}
            </div>

            <div>
              <label htmlFor="estoque" className="block text-gray-700 font-semibold mb-2">
                Estoque *
              </label>
              <input
                ref={estoqueRef}
                type="number"
                id="estoque"
                name="estoque"
                value={formData.estoque}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.estoque
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="0"
              />
              {errors.estoque && (
                <p className="text-red-500 text-sm mt-1">{errors.estoque}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="imagem" className="block text-gray-700 font-semibold mb-2">
              URL da Imagem *
            </label>
            <input
              ref={imagemRef}
              type="url"
              id="imagem"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.imagem
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.imagem && (
              <p className="text-red-500 text-sm mt-1">{errors.imagem}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Dica: Use imagens do Unsplash (https://unsplash.com)
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-bold text-lg transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold text-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroProduto;