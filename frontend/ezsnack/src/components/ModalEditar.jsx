import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import EstoqueService from '../services/EstoqueService';

const ModalEditar = ({ item, onClose, refreshItems }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      console.log('Dados do item no modalEditar:', item);
      setItemName(item.nome);
      setPrice(item.preco);
      setType(item.tipo || '');
    }
  }, [item]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !price || isNaN(price) || price <= 0) {
      setError('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      await EstoqueService.updateItem(item.id, {
        nome: itemName,
        preco: parseFloat(price),
        tipo: type,
        disponivel: true,
      });
      refreshItems();
      onClose();
    } catch (error) {
      setError('Erro ao atualizar item: ' + error.message);
    }
  };

  const handleDeleteClick = async (itemId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
    if (confirmDelete) {
      try {
        await EstoqueService.deleteItem(itemId);
        refreshItems();
        onClose();
      } catch (error) {
        alert('Erro ao excluir item: ' + error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative p-4 w-96 max-w-2xl bg-white rounded-lg shadow border-2 border-black">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-black">
          <h3 className="text-lg font-semibold text-gray-900">Atualizar item</h3>
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
        <form onSubmit={handleEditSubmit}>
          <div className="flex flex-col gap-4 mb-4">
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
                min="0"
                step="0.01"
                className="text-black text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full text-center shadow-md shadow-gray-600 h-11"
              />
            </div>
            <div>
              <label htmlFor="type" className="block mb-2 font-alexandria font-semibold text-gray-900">
                Tipo
              </label>
              <input
                type="text"
                id="type"
                value={type}
                readOnly
                className="text-gray-500 text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full text-center shadow-md shadow-gray-600 h-11"
              />
            </div>
          </div>
          
          {error && <p className="text-red-600">{error}</p>}

          <div className="flex items-center mt-10 space-x-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-10"></div>
              <button
                type="submit"
                className="relative text-black bg-[#fac141] text-x2 font-alexandria font-semibold px-4 py-2 border-2 border-black rounded h-10 hover:shadow-lg shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
              >
                Editar Item
              </button>
            </div>
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-10"></div>
              <button
                type="button"
                className="relative text-white bg-red-600 text-x2 font-alexandria font-semibold px-4 py-2 border-2 border-black rounded h-10 hover:shadow-lg shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                onClick={() => handleDeleteClick(item.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalEditar.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    tipo: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default ModalEditar;
