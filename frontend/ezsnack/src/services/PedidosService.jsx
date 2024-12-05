// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import CardPedidos from '../components/pedidos/CardPedidos';
import MaisDetalhes from '../components/pedidos/MaisDetalhes'; // Importe o componente de detalhes

const PedidosService = () => {
  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosAprovados, setPedidosAprovados] = useState([]);
  const [pedidosGerais, setPedidosGerais] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateKey, setUpdateKey] = useState(0); // Contador de atualização

  // Função para buscar os dados da API
  const fetchPedidos = async () => {
    try {
      // Recupera o objeto usuario do localStorage
      const usuarioData = localStorage.getItem('usuario');
      const usuario = usuarioData ? JSON.parse(usuarioData) : null;
      const escolaId = usuario?.escola?.id; // Acessa o id da escola dentro do objeto usuario

      if (!escolaId) {
        throw new Error('ID da escola não encontrado no localStorage');
      }

      // Faz o fetch para a API com o id da escola
      const response = await fetch(`http://localhost:8080/pedidos?escolaId=${escolaId}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar pedidos');
      }

      const data = await response.json();

      // Verifica se a resposta é um array de pedidos
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido');
      }

      // Filtrar pedidos por status
      const pendentes = data.filter(pedido => pedido.status === 'Pendente');
      const aprovados = data.filter(pedido => pedido.status === 'Aprovado');
      const gerais = data; // No geral, incluir todos os pedidos

      // Atualizar o estado com os pedidos filtrados
      setPedidosPendentes(pendentes || []);
      setPedidosAprovados(aprovados || []);
      setPedidosGerais(gerais || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Função para atualizar os pedidos e forçar a re-renderização
  const updatePedidos = async () => {
    await fetchPedidos(); // Atualiza os pedidos
    setUpdateKey(prev => prev + 1); // Incrementa a chave para forçar re-renderização
  };

    // Função para aprovar o pedido
    const aprovarPedido = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/pedidos/${id}/aprovar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          console.error('Erro ao aprovar pedido', await response.text());
        }
      } catch (error) {
        console.error('Erro ao aprovar pedido:', error);
      } finally {
        // Atualiza a lista de pedidos após a tentativa de aprovação, mesmo que tenha falhado
        fetchPedidos();
      }
    };
  
    // Função para negar o pedido
    const negarPedido = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/pedidos/${id}/negar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          console.error('Erro ao negar pedido', await response.text());
        }
      } catch (error) {
        console.error('Erro ao negar pedido:', error);
      } finally {
        // Atualiza a lista de pedidos após a tentativa de negação
        fetchPedidos();
      }
    };
  
    // Função para marcar como entregue o pedido
    const entregarPedido = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/pedidos/${id}/entregue`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          console.error('Erro ao entregar pedido', await response.text());
        }
      } catch (error) {
        console.error('Erro ao entregar pedido:', error);
      } finally {
        // Atualiza a lista de pedidos após a tentativa de entrega
        fetchPedidos();
      }
    };
  
    // Função para cancelar o pedido
    const cancelarPedido = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/pedidos/${id}/cancelar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          console.error('Erro ao cancelar pedido', await response.text());
        }
      } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
      } finally {
        // Atualiza a lista de pedidos após a tentativa de cancelamento
        fetchPedidos();
      }
    };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleMaisDetalhesClick = (pedido) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPedido(null);
  };

  return (
    <div className="pedidos-service">
      <CardPedidos
        key={`pendentes-${updateKey}`} // Força re-renderização ao mudar o updateKey
        pedidos={pedidosPendentes}
        tipo="pendentes"
        onMaisDetalhesClick={handleMaisDetalhesClick}
        onAprovarClick={aprovarPedido} // Passa a função de aprovar
        onNegarClick={negarPedido} // Passa a função de negar
      />
      <CardPedidos
        key={`aprovados-${updateKey}`} // Força re-renderização ao mudar o updateKey
        pedidos={pedidosAprovados}
        tipo="aprovados"
        onMaisDetalhesClick={handleMaisDetalhesClick}
        onEntregarClick={entregarPedido} // Passa a função de entregar
        onCancelarClick={cancelarPedido} // Passa a função de cancelar
      />
      <CardPedidos
        key={`gerais-${updateKey}`} // Força re-renderização ao mudar o updateKey
        pedidos={pedidosGerais}
        tipo="geral"
        onMaisDetalhesClick={handleMaisDetalhesClick}
      />

      {isModalOpen && selectedPedido && (
        <MaisDetalhes
          pedido={selectedPedido}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PedidosService;
