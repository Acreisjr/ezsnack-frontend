import React, { useState, useEffect, useRef } from 'react';

const FilaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const listaRef = useRef(null);  // Referência para o contêiner da lista

  useEffect(() => {
    const fetchPedidos = () => {
      // Obtém o id da escola do localStorage
      const usuarioData = localStorage.getItem('usuario');
      const usuario = usuarioData ? JSON.parse(usuarioData) : null;
      const escolaId = usuario?.escola?.id; // Acessa o id da escola

      // Verifica se o escolaId está disponível
      if (escolaId) {
        // Faz a requisição GET para a URL fornecida
        fetch(`http://localhost:8080/pedidos?escolaId=${escolaId}`)
          .then((response) => response.json())
          .then((data) => {
            // Filtra os pedidos com status "Aprovado"
            const pedidosAprovados = data.filter((pedido) => pedido.status === 'Aprovado');
            setPedidos(pedidosAprovados);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao buscar pedidos:', error);
            setLoading(false);
          });
      }
    };

    // Faz o primeiro fetch imediatamente ao carregar o componente
    fetchPedidos();

    // Configura um intervalo para o fetch ser feito a cada 20 segundos
    const intervalId = setInterval(fetchPedidos, 20000); // 20000 ms = 20 segundos

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Função para rolar suavemente
    const scrollSmoothly = () => {
      const listaElement = listaRef.current;
      if (!listaElement) return;

      // Total de deslocamento da rolagem
      const scrollHeight = listaElement.scrollHeight;
      const clientHeight = listaElement.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;

      let start = null;

      // Função de animação de rolagem
      const animateScroll = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Velocidade da rolagem (quanto menor, mais lento)
        const scrollSpeed = 0.05; // Ajuste para a rolagem ser mais lenta (menor valor = mais lento)

        // Calculando a posição de rolagem progressiva
        const scrollPosition = Math.min(progress * scrollSpeed, maxScrollTop);

        listaElement.scrollTop = scrollPosition;

        // Se não alcançou o fim, continue a animação
        if (scrollPosition < maxScrollTop) {
          requestAnimationFrame(animateScroll);
        } else {
          // Quando atingir o final, recomece o scroll para o topo
          listaElement.scrollTop = 0; // Volta para o topo imediatamente
          start = null;  // Reseta o timer para um novo ciclo de rolagem
          requestAnimationFrame(animateScroll); // Inicia o ciclo novamente
        }
      };

      requestAnimationFrame(animateScroll); // Começa a animação
    };

    // Inicia a rolagem suave quando os pedidos forem carregados
    if (!loading) {
      scrollSmoothly();
    }
  }, [loading, pedidos]);

  if (loading) {
    return (
      <div className="h-screen bg-[#fac141] flex items-center justify-center">
        <span className="text-white font-bold text-3xl">Carregando...</span>
      </div>
    );
  }

  // Organiza os pedidos para exibição
  const [pedidoPrincipal, ...outrosPedidos] = pedidos;

  return (
    <div className="h-screen bg-[#fac141] flex">
      {/* Coluna à esquerda */}
      <div className="w-3/5 p-5 flex flex-col gap-4">
        {/* Título "PEDIDOS PRONTOS" */}
        <h1 className="text-7xl font-bold text-center text-black mb-4">PEDIDOS PRONTOS</h1>

        {/* Quadrado Principal (Pedidos Prontos) */}
        <div className="w-full flex-1 bg-white shadow-lg rounded-lg flex items-center justify-center border-[3px] border-black">
          <h2 className="text-7xl font-bold text-black">
            {pedidoPrincipal ? pedidoPrincipal.nomeAluno : 'Nenhum Pedido'}
          </h2>
        </div>

        {/* Linha de 3 quadrados menores abaixo */}
        <div className="flex w-full gap-4">
          {outrosPedidos.slice(0, 3).map((pedido) => (
            <div
              key={pedido.id}
              className="flex-1 h-1/5 bg-white shadow-lg rounded-lg flex items-center py-14 justify-center border-[3px] border-black"
            >
              <h2 className="text-2xl font-bold text-black">{pedido.nomeAluno}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna à direita para a lista de pedidos prontos */}
      <div
        ref={listaRef}
        className="w-2/5 p-5 bg-white shadow-lg overflow-auto border-l-[3px] border-black" // Adicionando borda à esquerda
        style={{ scrollBehavior: 'smooth' }} // Aplicando o scroll suave
      >
        <h2 className="text-3xl font-bold text-black mb-6">TODOS OS PEDIDOS PRONTOS</h2>
        <ul className="space-y-6">
          {/* Mapeia todos os pedidos com status "Aprovado", do mais antigo para o mais recente */}
          {pedidos
            .slice()
            .reverse() // Inverte a ordem para mais antigo para mais recente
            .map((pedido) => (
              <li key={pedido.id} className="bg-gray-100 p-10 text-2xl font-bold text-black">
                {pedido.nomeAluno}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilaPedidos;
