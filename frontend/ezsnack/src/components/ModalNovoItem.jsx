import PropTypes from 'prop-types';
import { useState } from 'react';

const ModalNovoItem = ({ onClose, refreshItems }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [itemType, setItemType] = useState('SALGADO');
  const [disponibilidade, setDisponibilidade] = useState(true);

  // Recupera o ID da escola com a abordagem sugerida
  const usuarioData = localStorage.getItem('usuario');
  const usuario = usuarioData ? JSON.parse(usuarioData) : null;
  const escolaId = usuario?.escola?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!escolaId) {
      console.error('ID da escola não encontrado. Não é possível enviar os dados.');
      return;
    }

    const newItem = {
      nome: itemName,
      preco: parseFloat(price),
      tipo: itemType.toUpperCase(),
      disponibilidade,
      escolaId: escolaId,
    };

    try {
      const response = await fetch('http://localhost:8080/itemcantina', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Novo item registrado:', result);
        await refreshItems();
        onClose();
        setItemName('');
        setPrice('');
        setItemType('SALGADO');
        setDisponibilidade(true);
      } else {
        console.error('Erro ao registrar o item:', response.statusText);
        const errorData = await response.json();
        console.error('Detalhes do erro:', errorData);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow border-2 border-black">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-black">
          <h3 className="text-lg font-semibold text-gray-900">Adicionar Novo Item</h3>
          <button
            type="button"
            className="text-black hover:scale-125 transition duration-500"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-alexandria font-semibold text-gray-900">
                Item
              </label>
              <input
                type="text"
                id="name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="text-black text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full text-center shadow-md shadow-gray-600 h-11"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 font-alexandria font-semibold text-gray-900">
                Preço
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="text-black text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full text-center shadow-md shadow-gray-600 h-11"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="itemType" className="block mb-2 font-alexandria font-semibold text-gray-900">
                Tipo
              </label>
              <select
                id="itemType"
                value={itemType}
                onChange={(e) => setItemType(e.target.value.toUpperCase())}
                className="text-black text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full text-center shadow-md shadow-gray-600 h-11"
                required
              >
                <option value="SALGADO">SALGADO</option>
                <option value="DOCE">DOCE</option>
                <option value="BEBIDA">BEBIDA</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mt-10 space-x-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
              <button
                className="relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalNovoItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default ModalNovoItem;
