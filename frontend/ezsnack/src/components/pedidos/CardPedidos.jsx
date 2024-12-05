import { useState } from 'react';
import PropTypes from 'prop-types';
import LinhaPendentes from './LinhaPendentes';
import LinhaAprovados from './LinhaAprovados';
import LinhaGeral from './LinhaGeral';

const CardPedidos = ({
  pedidos,
  tipo,
  onMaisDetalhesClick,
  onAprovarClick,
  onNegarClick,
  onEntregarClick,
  onCancelarClick,
}) => {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const renderLinha = (pedido) => {
    const props = {
      key: pedido.id,
      alunoNome: pedido.nomeAluno,
      itens: pedido.itensPedidos,
      onMaisDetalhesClick: () => onMaisDetalhesClick(pedido),
    };

    switch (tipo) {
      case 'pendentes':
        return (
          <LinhaPendentes
            {...props}
            onAprovarClick={() => onAprovarClick(pedido.id)}
            onNegarClick={() => onNegarClick(pedido.id)}
          />
        );
      case 'aprovados':
        return (
          <LinhaAprovados
            {...props}
            onEntregarClick={() => onEntregarClick(pedido.id)}
            onCancelarClick={() => onCancelarClick(pedido.id)}
          />
        );
      case 'geral':
        return <LinhaGeral {...props} />;
      default:
        return null;
    }
  };

  const linhasExibidas = mostrarTodos ? pedidos : pedidos.slice(0, 1);
  const pedidosOcultados = pedidos.length - linhasExibidas.length;

  return (
    <div className="relative flex mx-auto flex-col my-6 bg-transparent border-2 border-black rounded-lg w-full max-w-4xl shadow-lg shadow-gray-600">
      <div className="relative mx-3 mb-0 border-b-2 border-black pt-3 pb-2 px-1 flex items-center justify-between">
        <span className="text-3xl font-alexandria font-semibold">{tipo.toUpperCase()}</span>
      </div>
      <div className="indice py-2">
        <div className="grid grid-cols-12 gap-4 mb-2">
          <h5 className="text-black text-2xl font-alexandria font-semibold text-left col-span-5 ml-4">Nome do Aluno</h5>
          {tipo !== 'geral' && (
            <>
              <h5 className="text-black text-2xl font-alexandria font-semibold text-center col-span-5"></h5>
              <div className="col-span-2 flex items-center justify-center relative">
                <h5 className="text-black text-2xl font-alexandria font-semibold"></h5>
              </div>
            </>
          )}
        </div>
        <div className="lista w-full mt-2">
          {linhasExibidas.map(renderLinha)}
        </div>
        {pedidos.length > 1 && (
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
                  {pedidosOcultados > 0 && (
                    <span
                      className="ml-2 text-[#FAC141] bg-[#FAC141] text-xs font-bold rounded px-1"
                      style={{ color: 'white' }}
                    >
                      +{pedidosOcultados}
                    </span>
                  )}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

CardPedidos.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nomeAluno: PropTypes.string.isRequired,
      precoTotal: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      itensPedidos: PropTypes.arrayOf(
        PropTypes.shape({
          nome: PropTypes.string.isRequired,
          valorTotal: PropTypes.number.isRequired,
          quantidade: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  tipo: PropTypes.oneOf(['pendentes', 'aprovados', 'geral']).isRequired,
  onMaisDetalhesClick: PropTypes.func.isRequired,
  onAprovarClick: PropTypes.func,
  onNegarClick: PropTypes.func,
  onEntregarClick: PropTypes.func,
  onCancelarClick: PropTypes.func,
};

export default CardPedidos;
