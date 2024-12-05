import PropTypes from 'prop-types';

const TabEscola = ({ selectedTab, onSelectTab }) => {

  return (
    <div>
      {/* Mobile View */}
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={selectedTab}
          onChange={(e) => onSelectTab(e.target.value)}
        >
          <option>Pedidos</option>
          <option>Financeiro</option>
          <option>Estoque</option>
          <option>Perfil</option>
          <option>Fila</option> {/* Nova opção "Fila" */}
        </select>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <nav className="flex gap-6" aria-label="Tabs">
          {['Pedidos', 'Financeiro', 'Estoque', 'Perfil'].map((tab) => (
            <a
              key={tab}
              href="#"
              onClick={() => onSelectTab(tab)}
              className={`shrink-0 rounded-lg p-2 text-sm font-medium border-2 border-black ${
                selectedTab === tab
                  ? 'bg-[#fac141] text-black'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              aria-current={selectedTab === tab ? 'page' : undefined}
            >
              {tab}
            </a>
          ))}

          {/* Nova aba "Fila" */}
          <a
            href="/filapedidos" // Link para a página FilaPedidos
            target="_blank" // Abre em uma nova aba
            rel="noopener noreferrer" // Segurança ao abrir em nova aba
            className={`shrink-0 rounded-lg p-2 text-sm font-medium border-2 border-black ${
              selectedTab === 'Fila'
                ? 'bg-[#fac141] text-black'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            Fila
          </a>
        </nav>
      </div>
    </div>
  );
};

// Definindo os tipos de propriedades que o componente espera
TabEscola.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onSelectTab: PropTypes.func.isRequired,
};

export default TabEscola;
