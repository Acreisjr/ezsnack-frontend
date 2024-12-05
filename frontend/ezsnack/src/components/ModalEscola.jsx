import PropTypes from 'prop-types';
import { useState } from 'react';

const ModalEscola = ({ onClose, escola,  }) => {
  const [nome, setNome] = useState(escola?.nome || '');
  const [cnpj, setCnpj] = useState(escola?.cnpj || '');
  const [telefone, setTelefone] = useState(escola?.telefone || '');
  const [cidade, setCidade] = useState(escola?.cidade || '');
  const [estado, setEstado] = useState(escola?.estado || '');
  const [qtAlunos, setQtAlunos] = useState(escola?.qtAlunos || '');

  const handleUpdate = async () => {
    const updatedData = {
      nome,
      cnpj,
      telefone,
      cidade,
      estado,
      qtAlunos,
    };

    if (window.confirm('Você tem certeza que deseja atualizar esta escola?')) {
      try {
        const response = await fetch(`http://localhost:8080/escola/${escola.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar a escola');
        }

        alert('Escola atualizada com sucesso!');
        
        onClose(); // Fecha o modal
      } catch (error) {
        alert(error.message); // Mostra erro
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Você tem certeza que deseja deletar esta escola?')) {
      try {
        const response = await fetch(`http://localhost:8080/escola/${escola.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar a escola');
        }

        alert('Escola deletada com sucesso!');
        
        onClose(); // Fecha o modal
      } catch (error) {
        alert(error.message); 
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow border-2 border-black">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-black">
          <h3 className="text-lg font-semibold text-gray-900">Atualizar Escola</h3>
          <button
            type="button"
            className="text-black hover:scale-125 transition duration-500"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nome" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                Nome da Escola
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)} // Atualiza o estado
                className="text-gray-500 text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="cnpj" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                CNPJ
              </label>
              <input
                type="text"
                id="cnpj"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)} // Atualiza o estado
                className="text-gray-500 text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                readOnly
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="telefone" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)} // Atualiza o estado
                className="text-black text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
              />
            </div>
            <div>
              <label htmlFor="cidade" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)} // Atualiza o estado
                className="text-gray-500 text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                readOnly
              />
            </div>
          </div>

          
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="estado" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="text-gray-500 text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                readOnly
              />
            </div>
            
            <div>
              <label htmlFor="qtAlunos" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                Quantidade de Alunos
              </label>
              <input
                type="number"
                id="qtAlunos"
                value={qtAlunos}
                onChange={(e) => setQtAlunos(e.target.value)} // Atualiza o estado
                className="text-black text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
              />
            </div>
          </div>
          <div className="flex items-center mt-10 space-x-4">
            <button
              type="button"
              className="text-black bg-[#fac141] text-sm font-alexandria font-semibold px-4 py-2 border border-black shadow-md shadow-gray-600 rounded h-10 hover:bg-yellow-600 transition duration-1000"
              onClick={handleUpdate}
            >
              Atualizar dados
            </button>
            <button
              type="button"
              className="text-white bg-red-600 text-sm font-alexandria font-semibold px-4 py-2 border border-black shadow-md shadow-gray-600 rounded h-10 hover:bg-red-800 transition duration-1000"
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalEscola.propTypes = {
  onClose: PropTypes.func.isRequired,
  escola: PropTypes.object.isRequired,
  
};

export default ModalEscola;