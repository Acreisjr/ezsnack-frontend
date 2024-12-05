import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="absolute top-0 left-0 w-full bg-transparent z-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <span className="text-black font-alexandria font-bold text-2xl">EZ</span>
              <span className="text-yellow-500 font-alexandria font-bold text-2xl">SNACK</span>
            </a>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Sobre </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Vantagens </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Como funciona </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Preços </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 border-dashed border-2 border-black rounded h-10"></div>
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    className="relative text-black bg-[#fac141] text-x2 font-alexandria font-semibold px-4 py-2 border-2 border-black rounded h-10 hover:shadow-lg shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
