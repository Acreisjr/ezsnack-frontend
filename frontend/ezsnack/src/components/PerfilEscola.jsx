import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar

const PerfilEscola = () => {
  const [escola, setEscola] = useState(null);
  const [username, setUsername] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const [currentPassword, setCurrentPassword] = useState(''); // Estado para a senha atual
  const [newPassword, setNewPassword] = useState(''); // Estado para a nova senha
  const navigate = useNavigate(); // Para navegação/redirect

  // Função para buscar os dados do localStorage
  const loadEscolaData = () => {
    const usuarioData = localStorage.getItem('usuario'); // Dados do usuário e escola no localStorage
    const usernameData = localStorage.getItem('username'); // Nome de usuário no localStorage

    if (usuarioData) {
      const usuario = JSON.parse(usuarioData); // Converte o JSON em objeto
      setEscola(usuario.escola); // Salva os dados da escola no estado
    }

    if (usernameData) {
      setUsername(usernameData); // Salva o nome de usuário no estado
    }
  };

  useEffect(() => {
    loadEscolaData(); // Carrega os dados quando o componente é montado
  }, []);

  // Função para redirecionar para a tela de login
  const handleLogout = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  // Função para abrir o modal
  const handleOpenModal = () => {
    setModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false); // Fecha o modal
    setCurrentPassword(''); // Limpa o campo da senha atual
    setNewPassword(''); // Limpa o campo da nova senha
  };

  // Função para alterar a senha
  const handleChangePassword = async () => {
    const usuarioData = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioData); // Obtém os dados do usuário

    if (usuario && usuario.id) {
      try {
        const response = await fetch(`http://localhost:8080/usuarios/update/${usuario.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ senhaAtual: currentPassword, novaSenha: newPassword }),
        });

        if (response.ok) {
          alert('Senha alterada com sucesso!');
          handleCloseModal(); // Fecha o modal após sucesso
          navigate('/login'); //Redireciona para a tela de Login após alterar a senha
        } else {
          alert('Erro ao alterar a senha. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        alert('Erro ao alterar a senha. Tente novamente.');
      }
    }
  };

  // Exibir um loading caso os dados ainda estejam sendo carregados
  if (!escola) {
    return <div className="text-center">Carregando...</div>;
  }



  return (
    <div className="relative  mx-auto  flex flex-col my-6 bg-transparent w-full max-w-2xl">
      <div className="flex flex-col w-full max-w-4xl space-y-4">

        {/* Primeiro Card - Informações da Instituição */}
        <div className="bg-gray-100 p-6 shadow-sm border-2 border-black rounded-lg">
          <h2 className="text-black text-2xl font-alexandria font-bold mb-4">Instituição:</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Nome:</span>
              <span className="text-black text-lg font-alexandria">{escola.nome}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Telefone:</span>
              <span className="text-black text-lg font-alexandria">{escola.telefone}</span>
            </div>

            <div className='flex justify-between'>
              <span className="text-black text-lg font-alexandria font-semibold">CNPJ:</span>
              <span className="text-black text-lg font-alexandria">{escola.cnpj}</span>
            </div>

            {/* <div className='flex justify-between'>
              <span className="text-black text-lg font-alexandria font-semibold">Qtde. de alunos:</span>
              <span className="text-black text-lg font-alexandria">{escola.qtAlunos}</span>
            </div>
        */}
            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Estado:</span>
              <span className="text-black text-lg font-alexandria">{escola.estado}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Cidade:</span>
              <span className="text-black text-lg font-alexandria">{escola.cidade}</span>
            </div>

          </div>
        </div>

        {/* Segundo Card pode ser preenchido futuramente */}
        {/* <div className="bg-gray-100 p-6 shadow-sm border-2 border-black rounded-lg">
          <h2 className="text-black text-2xl font-alexandria font-bold mb-4">Responsável legal:</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Nome:</span>
              <span className="text-black text-lg font-alexandria">Em breve</span> 
            </div>

            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Sobrenome:</span>
              <span className="text-black text-lg font-alexandria">Em breve</span> 
            </div>

            <div className='flex justify-between'>
                <span className="text-black text-lg font-alexandria font-semibold">Email:</span>
                <span className="text-black text-lg font-alexandria">Em breve</span> 
            </div>

            <div className='flex justify-between'>
              <span className="text-black text-lg font-alexandria font-semibold">Telefone:</span>
              <span className="text-black text-lg font-alexandria">Em breve</span> 
            </div>

          </div>
        </div> 
      */}

        <div className="bg-gray-100 p-6 shadow-sm border-2 border-black rounded-lg">
          <h2 className="text-black text-2xl font-alexandria font-bold mb-4">Acesso:</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black text-lg font-alexandria font-semibold">Usuário:</span>
              <span className="text-black text-lg font-alexandria">{username}</span>
            </div>

            <div className="flex justify-center space-x-4 mt-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                <button
                  onClick={handleOpenModal} // Abre o modal ao clicar
                  className="relative text-black bg-[#fac141] text-lg font-alexandria font-semibold px-8 py-2 border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                >
                  Alterar Senha
                </button>
              </div>
              <div className="relative inline-block">
                <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                <button
                  onClick={handleLogout} // Chama a função de logout para redirecionar
                  className="relative text-white bg-red-600 text-lg font-alexandria font-semibold px-8 py-2  border-2 border-black rounded h-11 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                >
                  Sair
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modal de Alterar Senha */}    
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow border-2 border-black">
            <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-black">
              <h3 className="text-lg font-semibold text-gray-900">Alterar Senha</h3>
              <button
                type="button"
                className="text-black hover:scale-125 transition duration-500"
                onClick={handleCloseModal}
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
            <form>
              <div className="grid gap-4 mb-4">
                <div>
                  <label htmlFor="currentPassword" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="text-black text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block mb-2 font-alexandria font-semibold text-gray-900 text-sm">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-black text-md bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-full px-3 shadow-md shadow-gray-600 h-11"
                  />
                </div>
              </div>
              <div className="flex items-center mt-10 space-x-4">
                <button
                  type="button"
                  className="text-black bg-[#fac141] text-sm font-alexandria font-semibold px-4 py-2 border border-black shadow-md shadow-gray-600 rounded h-10 hover:bg-yellow-600 transition duration-1000"
                  onClick={handleChangePassword}
                >
                  Alterar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>

  );
};

export default PerfilEscola;
