import PropTypes from 'prop-types';
import arrow from '../assets/arrowDown.png';
import LinhaEstoque from './LinhaEstoque';
import ModalEditar from './ModalEditar';
import EstoqueService from '../services/EstoqueService';
import ModalNovoItem from './ModalNovoItem';
import { useState } from 'react';

const CardEstoque = ({ title, items, refreshItems }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalNewOpen, setModalNewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mostrarTodos, setMostrarTodos] = useState(false); // Estado para controle de linhas exibidas

  const openEditModal = (item) => {
    setSelectedItem(item);
    setModalEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
    setSelectedItem(null);
  };

  const handleNewItemClick = () => {
    setModalNewOpen(true);
  };

  const handleCloseNewItemModal = () => {
    setModalNewOpen(false);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await EstoqueService.deleteItem(itemId);
      refreshItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleEdit = async (updatedItem) => {
    try {
      await EstoqueService.updateItem(updatedItem);
      refreshItems();
      handleCloseEditModal();
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const handleAvailableClick = async (item) => {
    const payload = {
      nome: item.nome,
      tipo: item.tipo,
      disponivel: true,
      preco: item.preco,
    };
    try {
      await EstoqueService.updateItem(item.id, payload);
      refreshItems();
    } catch (error) {
      console.error('Erro ao definir item como disponível:', error);
    }
  };

  const handleUnavailableClick = async (item) => {
    const payload = {
      nome: item.nome,
      tipo: item.tipo,
      disponivel: false,
      preco: item.preco,
    };
    try {
      await EstoqueService.updateItem(item.id, payload);
      refreshItems();
    } catch (error) {
      console.error('Erro ao definir item como indisponível:', error);
    }
  };

  // Controlar itens exibidos
  const itensExibidos = mostrarTodos ? items : items.slice(0, 3); // Mostrar todos ou apenas 3
  const itensOcultados = items.length - itensExibidos.length; // Número de itens ocultados

  return (
    <div className="relative flex mx-auto flex-col my-6 bg-transparent shadow-sm border-2 border-black rounded-lg w-full max-w-4xl">
      <div className="relative mx-3 mb-0 border-b-2 border-black pt-3 pb-2 px-1 flex items-center justify-between">
        <span className="text-3xl font-alexandria font-semibold">{title}</span>
        <div className="relative inline-block">
          <div className="absolute inset-0 border-dashed border-2 border-black rounded h-8 transition-all duration-300"></div>
          <button
            onClick={handleNewItemClick}
            className="relative text-black bg-[#fac141] text-x2 mb-1 font-alexandria font-semibold px-4 border-2 border-black rounded h-8 hover:shadow-md shadow-gray-600 transition-transform duration-300 transform hover:-translate-y-1 hover:translate-x-1"
          >
            + Novo Item
          </button>
        </div>
      </div>

      <div className="indice py-2">
        <div className="grid grid-cols-12 gap-4 mb-2">
          <h5 className="text-black text-2xl font-alexandria font-semibold text-left col-span-5 ml-4">Item</h5>
          <h5 className="text-black text-2xl font-alexandria font-semibold text-center col-span-2">Preço</h5>
          <div className="col-span-5 flex items-center justify-center relative">
            <h5 className="text-black text-2xl font-alexandria font-semibold">Status</h5>
            <button className="absolute right-4 p-1 bg-transparent border-0 cursor-pointer hover:scale-110 transition duration-300">
              <img src={arrow} alt="Resumir" className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="lista w-full mt-2">
          {itensExibidos.map((item, index) => (
            <LinhaEstoque
              key={index}
              itemName={item.nome}
              price={item.preco}
              itemId={item.id}
              isAvailable={item.disponivel}
              itemType={item.tipo} // Passando o tipo do item para LinhaEstoque
              onAvailableClick={() => handleAvailableClick(item)}
              onUnavailableClick={() => handleUnavailableClick(item)}
              onEditClick={() => openEditModal(item)}
              onDeleteClick={() => handleDeleteClick(item.id)}
            />
          ))}
        </div>

        {items.length > 3 && (
          <div className="flex justify-center relative">
            <button
              className="w-full bg-transparent text-base font-alexandria text-black py-1.5 border-t-2 border-black text-center hover:text-[#FAC141]"
              onClick={() => setMostrarTodos(!mostrarTodos)}
            >
              {mostrarTodos ? (
                'Mostrar menos'
              ) : (
                <span className="relative">
                  Mostrar mais
                  {itensOcultados > 0 && (
                    <span
                      className="ml-2 text-[#FAC141] bg-[#FAC141] text-xs font-bold rounded px-1"
                      style={{ color: 'white' }}
                    >
                      +{itensOcultados}
                    </span>
                  )}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {modalEditOpen && (
        <ModalEditar
          item={selectedItem}
          onClose={handleCloseEditModal}
          onSave={handleEdit}
          refreshItems={refreshItems}
        />
      )}
      {modalNewOpen && (
        <ModalNovoItem
          onClose={handleCloseNewItemModal}
          refreshItems={refreshItems}
        />
      )}
    </div>
  );
};

CardEstoque.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      tipo: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
      disponivel: PropTypes.bool.isRequired,
    })
  ).isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default CardEstoque;
