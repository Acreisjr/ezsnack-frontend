import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes
import Login from './pages/Login';
import GerenciaEscola from './pages/GerenciaEscola';
import GerenciaAdmin from './pages/GerenciaAdmin';
import FilaPedidos from './pages/FilaPedidos'; // Importa o componente FilaPedidos
import Header from './components/landing/Header'; // Importa o componente Header
import Banner from './components/landing/Banner'; // Importa o componente Banner

function App() {
  const location = useLocation();

  // Componente que protege as rotas de administração
  const ProtectedRoute = ({ element }) => {
    // Retorna o elemento, permitindo acesso a todas as rotas
    return element;
  };

  // Definindo as propTypes para o componente ProtectedRoute
  ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Renderizando o Header e o Banner apenas na rota '/' */}
      {location.pathname === '/' && (
        <>
          <Header />
          <Banner />
        </>
      )}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protege a rota GerenciaEscola para usuários ADMIN_ESCOLA */}
          <Route 
            path="/gerenciaescola" 
            element={<ProtectedRoute element={<GerenciaEscola />} />} 
          />

          {/* Protege a rota GerenciaAdmin para usuários ADMIN */}
          <Route 
            path="/gerenciaadmin" 
            element={<ProtectedRoute element={<GerenciaAdmin />} />} 
          />
          <Route path="/filapedidos" element={<FilaPedidos />} />
        </Routes>
      </main>
    </div>
  );
}

// Componente Wrapper para integrar o Router
export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
