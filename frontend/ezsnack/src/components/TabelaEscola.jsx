import React, { useEffect, useState } from 'react';
import moreOptions from '../assets/moreOptions.png';
import ModalEscola from './ModalEscola';

const TabelaEscola = () => {
  const [escolas, setEscolas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState(null);

  const fetchEscolas = async () => {
    try {
      const response = await fetch('http://localhost:8080/escola');
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setEscolas(data);
      } else {
        console.error('Dados inesperados da API:', data);
        setEscolas([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados das escolas:', error);
    }
  };

  useEffect(() => {
    fetchEscolas();
  }, []);

  const openModal = (escola) => {
    setSelectedEscola(escola);
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);
    setSelectedEscola(null);
    await fetchEscolas(); // Recarrega os dados da tabela após fechar o modal
  };

  return (
    <div className="flex flex-col items-center font-alexandria mt-4"> {/* Removemos justify-center e min-h-screen */}
      <div className="relative flex flex-col bg-transparent shadow-sm border-2 border-black rounded-lg w-full max-w-4xl">
        <table className="min-w-full bg-transparent rounded-xl">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-3 px-4 text-left">Instituição</th>
              <th className="py-3 px-4 text-left">Cidade/Estado</th>
              <th className="py-3 px-4 text-left">Qtd. Alunos</th>
              <th className="py-3 px-4 text-left">CNPJ</th>
              <th className="py-3 px-4 text-left">Telefone</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {escolas.length > 0 ? (
              escolas.map((escola, index) => (
                <tr key={escola.id} className={index === escolas.length - 1 ? "" : "border-b-2 border-black"}>
                  <td className="py-3 px-4">{escola.nome}</td>
                  <td className="py-3 px-4">{escola.cidade}/{escola.estado}</td>
                  <td className="py-3 px-4">{escola.qtAlunos}</td>
                  <td className="py-3 px-4">{escola.cnpj}</td>
                  <td className="py-3 px-4">{escola.telefone}</td>
                  <td className="py-3 px-4">
                    <button 
                      className="ml-2 p-1 bg-transparent border-0 cursor-pointer" 
                      onClick={() => openModal(escola)}
                    >
                      <img src={moreOptions} alt="Mais opções" className="h-6 w-6 hover:scale-110 transition duration-300" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">Nenhuma escola encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && <ModalEscola onClose={closeModal} escola={selectedEscola} />}
    </div>
  );
};

export default TabelaEscola;
