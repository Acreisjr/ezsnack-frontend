

const Banner = () => {
    return (
      <section
      className="relative bg-[url(.jpg)] bg-cover bg-center bg-no-repeat"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r pb-5 from-[#fac141] via-[#fac141] to-[#fac141] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
        <span className="text-black">Pronto para</span> otimizar <span className="text-black">a</span>
            <span className="sm:block"> gestão <span className="text-black">da</span>  sua cantina? </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Automatize suas vendas e ofereça mais praticidade para pais e alunos!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-10"></div>
              <button
                type="submit"
                className="relative text-black bg-[#fac141] text-x2 font-alexandria font-semibold px-4 py-2 border-2 border-black  rounded h-10 hover:shadow-lg shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
              >
                Começar Agora!
              </button>
            </div>
            <div className="relative inline-block">
              <div className="absolute inset-0 border-dashed border-2 border-black rounded h-10"></div>
              <button
                type="submit"
                className="relative text-black bg-gray-200 text-x2 font-alexandria font-semibold px-4 py-2 border-2 border-black  rounded h-10 hover:shadow-lg shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  };
  
  export default Banner;
  