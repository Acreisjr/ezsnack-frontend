import PropTypes from 'prop-types';

const LinhaAprovados = ({ alunoNome, itens, onEntregarClick, onCancelarClick, onMaisDetalhesClick }) => {
  return (
    <div className="border-t-2 border-black mb-2">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4">
          <span className="text-black text-2xl font-alexandria font-semibold text-left">{alunoNome}</span>
          <p className="text-gray-600 text-sm mt-1 font-alexandria">
            {/* Exibir os itens com quantidade e nome */}
            {itens.map(item => (
              <span key={item.nome}>
                {item.quantidade}x {item.nome}
                {/* Adiciona vírgula se não for o último item */}
                {itens[itens.length - 1].nome !== item.nome && ', '}
              </span>
            ))}
          </p>
        </div>
        <div className="flex justify-center items-center col-span-3">
          <div className="relative inline-block">
            <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
            <button
              className="relative text-black bg-gray-200 text-lg font-alexandria font-semibold px-8 py-2 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
              onClick={onMaisDetalhesClick}
            >
              Mais detalhes
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end col-span-5">
          <div className="flex space-x-2">
            {/* Envolvendo o botão Entregar com o div da borda pontilhada */}
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
              <button
                className="relative text-black bg-gray-200 text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                onClick={onEntregarClick}
              >
                Entregar
              </button>
            </div>
            {/* Envolvendo o botão Cancelar com o div da borda pontilhada */}
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
              <button
                className="relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                onClick={onCancelarClick}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validação de props
LinhaAprovados.propTypes = {
  alunoNome: PropTypes.string.isRequired,
  itens: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      valorTotal: PropTypes.number.isRequired,
      quantidade: PropTypes.number.isRequired,
    })
  ).isRequired,
  onMaisDetalhesClick: PropTypes.func.isRequired,
  onEntregarClick: PropTypes.func.isRequired,
  onCancelarClick: PropTypes.func.isRequired,
};

export default LinhaAprovados;
