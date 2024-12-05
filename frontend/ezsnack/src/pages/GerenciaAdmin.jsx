import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import TabAdmin from '../components/TabAdmin'; // Componente de navegação por abas
import TabelaEscola from '../components/TabelaEscola'; // Componente para exibir a lista de escolas
import FormCadastroEscola from "../components/FormCadastroEscola";

const GerenciaAdmin = () => {
  const navigate = useNavigate(); // Para redirecionamento
  const [selectedTab, setSelectedTab] = useState('Escolas'); // Tab inicial

  // Função para verificar se o usuário está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logado') === 'true'; // Checa se o status de logado é true
    if (!isLoggedIn) {
      navigate('/login'); // Redireciona para a página de login se não estiver logado
    }
  }, [navigate]); // Executa uma vez quando o componente é montado

  return (
    <div className="pt-16"> {/* Compensar a barra de navegação */}
      <nav className="fixed top-0 left-0 w-full bg-transparent py-4 px-10 flex items-center justify-between">
        <ul className="flex flex-1 space-x-4">
          <li className="text-2xl font-archivo font-black">
            <a href="/">
              <span className="text-black font-alexandria font-bold text-2xl">EZ</span>
              <span className="text-yellow-500 font-alexandria font-bold text-2xl">SNACK</span>
            </a>
          </li>
        </ul>
        <ul className="flex space-x-4"></ul>
      </nav>

      <h1 className="mt-2 text-3xl font-bold text-center">Gerência Administrativa</h1>

      {/* Centralize o componente TabAdmin */}
      <div className="mt-5 flex justify-center">
        <TabAdmin selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>

      {/* Renderiza o conteúdo da aba */}
      <div className="mt-10 flex justify-center">
        {selectedTab === 'Escolas' && <TabelaEscola />} {/* Exibe a tabela de escolas */}
        {selectedTab === 'Nova Escola' && <div><FormCadastroEscola /></div>} {/* Placeholder para futura implementação */}
        {selectedTab === 'Implementar2' && <div>Conteúdo para Implementar2</div>} {/* Placeholder para futura implementação */}
        {selectedTab === 'Implementar3' && <div>Conteúdo para Implementar3</div>} {/* Placeholder para futura implementação */}
      </div>
    </div>
  );
};

export default GerenciaAdmin;
