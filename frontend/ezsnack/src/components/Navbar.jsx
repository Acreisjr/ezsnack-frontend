import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent py-4 px-10 flex items-center justify-between">
      <ul className="flex flex-1 space-x-4">
        <li className="text-2xl font-archivo font-black">
        <Link to="/"><span className="text-black font-alexandria font-bold text-2xl">EZ</span>
        <span className="text-yellow-500 font-alexandria font-bold text-2xl">SNACK</span></Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li>
          <Link to="/estoque" className="text-lg font-archivo font-bold">ESTOQUE</Link>
        </li>
        <li>
          <Link to="/fila" className="text-lg font-archivo font-bold">FILA</Link>
        </li>
        <li>
          <Link to="/pedidos" className="text-lg font-archivo font-bold">PEDIDOS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
