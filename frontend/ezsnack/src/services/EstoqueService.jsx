const fetchItems = async (escolaId) => {
  try {
    const response = await fetch(`http://localhost:8080/itemcantina?escolaId=${escolaId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar itens.');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return {
        salgados: [],
        doces: [],
        bebidas: []
      };
    }

    const itensPorCategoria = {
      salgados: [],
      doces: [],
      bebidas: []
    };

    data.forEach(item => {
      const tipoItem = item.tipo ? item.tipo.toUpperCase() : '';

      if (tipoItem === 'SALGADO') {
        itensPorCategoria.salgados.push({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco),
          tipo: item.tipo,
          disponivel: item.disponivel,
        });
      } else if (tipoItem === 'DOCE') {
        itensPorCategoria.doces.push({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco),
          tipo: item.tipo,
          disponivel: item.disponivel,
        });
      } else if (tipoItem === 'BEBIDA') {
        itensPorCategoria.bebidas.push({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco),
          tipo: item.tipo,
          disponivel: item.disponivel,
        });
      }
    });

    return itensPorCategoria;
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return {
      salgados: [],
      doces: [],
      bebidas: [],
    };
  }
};

// Método PUT para atualizar um item
const updateItem = async (itemId, updatedItem) => {
  try {
    const response = await fetch(`http://localhost:8080/itemcantina/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o item.');
    }

    const data = await response.json();
    return data;  // Retorna o item atualizado ou uma confirmação de sucesso

  } catch (error) {
    console.error('Erro ao atualizar o item:', error);
    throw error;  // Propaga o erro para que a UI ou outros componentes possam tratá-lo
  }
};


const deleteItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/itemcantina/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    // Caso a API não retorne um corpo (geralmente em DELETE), não tentamos fazer response.json()
    if (response.status !== 204) {
      const data = await response.json();
      return data;
    }
    
    // Se o status for 204 (sem conteúdo), apenas retorna null
    return null;
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    throw error; // Propaga o erro para ser tratado no componente que chama essa função
  }
};



// Serviço que obtém o estoque da escola
const EstoqueService = {
  getEstoque: async () => {
    const usuarioData = localStorage.getItem('usuario');
    
    if (!usuarioData) {
      console.error("Usuário não encontrado no localStorage");
      return { salgados: [], doces: [], bebidas: [] };
    }

    const usuario = JSON.parse(usuarioData);
    const escolaId = usuario?.escola?.id;

    if (!escolaId) {
      console.error("Escola ID não encontrado");
      return { salgados: [], doces: [], bebidas: [] };
    }

    return fetchItems(escolaId);
  },

  updateItem: async (itemId, item) => {
    const updatedItem = {
      nome: item.nome,
      tipo: item.tipo,  // Assuming `item.tipo` is passed as part of the item
      disponibilidade: item.disponivel,  // Convert 'disponivel' to 'disponibilidade'
      preco: item.preco,
    };

    return updateItem(itemId, updatedItem);
  },

  deleteItem: async (itemId) => {
    return deleteItem(itemId);
  },
};

export default EstoqueService;
