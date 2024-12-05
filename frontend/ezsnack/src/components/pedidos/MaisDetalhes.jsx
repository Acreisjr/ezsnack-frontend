import PropTypes from 'prop-types';
import { useEffect } from 'react';

const MaisDetalhes = ({ pedido, onClose }) => {
  useEffect(() => {
    // Qualquer lógica que você precisar quando o modal abrir
  }, [pedido]);

  // Função para formatar a data
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const ano = String(data.getFullYear()).slice(-2); // Pega os últimos 2 dígitos do ano
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`;
  };

  // Função para formatar o valor como moeda
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow border-2 border-black">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-black">
          <h3 className="text-lg font-semibold text-gray-900">Detalhes do Pedido</h3>
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

        <div className="flow-root rounded-lg py-3">
          <dl className="-my-3 text-sm">
            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-black">Aluno</dt>
              <dd className="text-gray-700 sm:col-span-2">{pedido?.nomeAluno}</dd>
            </div>

            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-black">Data</dt>
              <dd className="text-gray-700 sm:col-span-2">{formatarData(pedido?.data)}</dd>
            </div>

            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-black">Status</dt>
              <dd className="text-gray-700 sm:col-span-2">{pedido?.status}</dd>
            </div>

            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-black">Valor do Pedido</dt>
              <dd className="text-gray-700 sm:col-span-2">{formatarMoeda(pedido?.precoTotal)}</dd>
            </div>

            <div className="grid grid-cols-1   gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-black">Itens do pedido</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {pedido?.itensPedidos && pedido.itensPedidos.length > 0 ? (
                  pedido.itensPedidos.map(item => (
                    <div key={item.nome}>
                      {item.quantidade}x - {item.nome}
                    </div>
                  ))
                ) : (
                  <div>Nenhum item encontrado.</div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

// Validação de props
MaisDetalhes.propTypes = {
  onClose: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired,
};

export default MaisDetalhes;
