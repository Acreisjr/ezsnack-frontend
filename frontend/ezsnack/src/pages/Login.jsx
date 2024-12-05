import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    // Limpa o localStorage quando a página é carregada
    useEffect(() => {
        localStorage.clear();
    }, []);  // Executa uma vez quando o componente é montado

    const handleSubmit = async (e) => {
        e.preventDefault();

        const login = {
            user: user,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (!response.ok) {
                alert("Falha ao efetuar o login.");
                throw new Error('Erro ao enviar os dados para o servidor.');
            }

            const data = await response.json();

            // Salva os dados do usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(data));

            // Salva o username no localStorage
            localStorage.setItem('username', user); // Salva o nome de usuário

            // Adiciona o status logado true no localStorage
            localStorage.setItem('logado', 'true');

            // Verifica o tipo de usuário e redireciona adequadamente
            if (data.tipo === 'ADMIN_ESCOLA') {
                navigate(`/gerenciaEscola`); 
            } else if (data.tipo === 'ADMIN') {
                navigate(`/gerenciaAdmin`); // Redireciona para gerenciaAdmin/{id}
            } else {
                navigate('/'); // Redireciona para a página principal
            }

        } catch (e) {
            console.log('Erro: ', e);
        }
    };
    
    return (
        <div className="conteiner">
            <header className="cabecalho">
                <div className="conteiner-titulo">
                    <h1 className="titulo-login">Ez<span>snack</span></h1>
                </div> 
            </header>
            <main className="secao-login">
                <div className="conteiner-login">
                    <h2 className="mb-16">Login do Parceiro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-login">
                            <div className="flex flex-col space-y-4"> {/* Somente inputs serão flex-col */}
                                <input 
                                    type="text" 
                                    name="user" 
                                    value={user} 
                                    onChange={(e) => setUser(e.target.value)} 
                                    placeholder="Usuário" 
                                    required 
                                    className="text-black text-xl bg-gray-200 font-alexandria mb-5 font-semibold border border-black rounded p-1 w-96 text-center shadow-md shadow-gray-600 h-11"
                                />
                                <input 
                                    type="password" 
                                    name="senha" 
                                    value={senha} 
                                    onChange={(e) => setSenha(e.target.value)} 
                                    placeholder="Senha" 
                                    required 
                                    className="text-black text-xl bg-gray-200 font-alexandria font-semibold border border-black rounded p-1 w-96 text-center shadow-md shadow-gray-600 h-11"
                                />
                            </div>
                            <div className="relative inline-block mt-10"> {/* O botão fica fora do flex-col */}
                                <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                                <button
                                    className="botao-login relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 w-60 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                                    type="submit"
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;
