import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabEscola from '../components/TabEscola';
import PerfilEscola from '../components/PerfilEscola';
import EstoqueService from '../services/EstoqueService';
import PedidosService from '../services/PedidosService';
import CardFinanceiro from '../components/CardFinanceiro';
import CardEstoque from '../components/CardEstoque';

const GerenciaEscola = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Pedidos');
  const [estoqueData, setEstoqueData] = useState({ salgados: [], doces: [], bebidas: [] });

  // Função para verificar se o usuário está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logado') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Função para carregar os dados da aba selecionada
  const loadData = async (tab) => {
    if (tab === 'Estoque') {
      const data = await EstoqueService.getEstoque();
      setEstoqueData(data); // Atualiza o estado com os dados do estoque
    }
  };

  useEffect(() => {
    loadData(selectedTab);
  }, [selectedTab]);

  // Função para atualizar os itens de estoque após exclusão
  const refreshItems = async () => {
    try {
      const data = await EstoqueService.getEstoque();
      setEstoqueData(data); // Atualiza o estado com os dados do estoque mais recentes
    } catch (error) {
      console.error('Erro ao atualizar o estoque:', error);
    }
  };

  return (
    <div className="pt-16">
      <nav className="fixed top-0 left-0 w-full bg-transparent py-4 px-10 flex items-center justify-between">
        <ul className="flex flex-1 space-x-4">
          <li className="text-2xl font-archivo font-black">
            <a href="/">
              <span className="text-black font-alexandria font-bold text-2xl">EZ</span>
              <span className="text-yellow-500 font-alexandria font-bold text-2xl">SNACK</span>
            </a>
          </li>
        </ul>
      </nav>
  
      <h1 className="mt-2 text-3xl font-bold text-center">Gerência da Escola</h1>
  
      <div className="mt-5 flex justify-center">
        <TabEscola selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
  
      <div className="mt-10 flex justify-center flex-col gap-4 w-full px-4 mx-auto">
        {selectedTab === 'Estoque' && (
          <>
            <CardEstoque
              title="Salgados"
              items={estoqueData.salgados || []} // Garantir que 'items' seja um array
              refreshItems={refreshItems} // Passa a função para atualizar o estoque
            />
            <CardEstoque
              title="Doces"
              items={estoqueData.doces || []} // Garantir que 'items' seja um array
              refreshItems={refreshItems} // Passa a função para atualizar o estoque
            />
            <CardEstoque
              title="Bebidas"
              items={estoqueData.bebidas || []} // Garantir que 'items' seja um array
              refreshItems={refreshItems} // Passa a função para atualizar o estoque
            />
          </>
        )}
        {selectedTab === 'Pedidos' && <PedidosService />}
        {selectedTab === 'Financeiro' && <CardFinanceiro />}
        {selectedTab === 'Perfil' && <PerfilEscola />}
      </div>
    </div>
  );
};

export default GerenciaEscola;
