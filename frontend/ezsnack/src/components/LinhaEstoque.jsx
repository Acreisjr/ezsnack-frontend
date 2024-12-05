import PropTypes from 'prop-types';
import { useState } from 'react';
import moreOptions from '../assets/moreOptions.png';
import EstoqueService from '../services/EstoqueService';

const LinhaEstoque = ({ itemName, price, itemId, isAvailable, itemType, onAvailableClick, onUnavailableClick, onEditClick }) => {
  const [available, setAvailable] = useState(isAvailable);

  const handleAvailableClick = async () => {
    const payload = {
      nome: itemName,
      tipo: itemType ? itemType.toUpperCase() : "", // Garantir que tipo está em caixa alta
      disponibilidade: true,
      preco: price
    };

    console.log("Dados a serem enviados para Disponível:", payload);

    try {
      await EstoqueService.updateItem(itemId, payload);
      setAvailable(true); 
      onAvailableClick(); 
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade para disponível:', error);
    }
  };

  const handleUnavailableClick = async () => {
    const payload = {
      nome: itemName,
      tipo: itemType ? itemType.toUpperCase() : "",
      disponibilidade: false,
      preco: price
    };

    console.log("Dados a serem enviados para Indisponível:", payload);

    try {
      await EstoqueService.updateItem(itemId, payload);
      setAvailable(false); 
      onUnavailableClick(); 
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade para indisponível:', error);
    }
  };

  return (
    <div className="border-t-2 border-black mb-2">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-5">
          <span className="text-black text-2xl font-alexandria font-semibold text-left">{itemName}</span>
        </div>
        <div className="flex justify-center items-center col-span-2">
          <div className="text-black text-xl bg-gray-200 font-alexandria font-semibold border-2 border-black rounded p-1 w-24 text-center h-11 flex items-center justify-center">
            {price}
          </div>
        </div>
        <div className="flex items-center justify-end col-span-5">
          <div className="flex space-x-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
              <button
                className={`relative text-black text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1 ${
                  available ? 'bg-[#fac141]' : 'bg-gray-200'
                }`}
                onClick={handleAvailableClick}
              >
                Disponível
              </button>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
              <button
                className={`relative text-black text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1 ${
                  !available ? 'bg-[#fac141]' : 'bg-gray-200'
                }`}
                onClick={handleUnavailableClick}
              >
                Indisponível
              </button>
            </div>
          </div>
          <button onClick={onEditClick} className="ml-2 p-1 bg-transparent border-0 cursor-pointer hover:scale-110 transition duration-300">
            <img src={moreOptions} alt="Mais opções" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

LinhaEstoque.propTypes = {
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired, 
  onAvailableClick: PropTypes.func.isRequired,
  onUnavailableClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default LinhaEstoque;
