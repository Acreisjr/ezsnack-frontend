import PropTypes from 'prop-types';

const TabAdmin = ({ selectedTab, onSelectTab }) => {

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
          <option>Escolas</option>
          <option>Nova Escola</option>
          <option>Implementar2</option>
          <option>Implementar3</option>
        </select>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <nav className="flex gap-6" aria-label="Tabs">
          {['Escolas', 'Nova Escola', 'Implementar2', 'Implementar3'].map((tab) => (
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
        </nav>
      </div>
    </div>
  );
};

// Definindo os tipos de propriedades que o componente espera
TabAdmin.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onSelectTab: PropTypes.func.isRequired,
};

export default TabAdmin;
