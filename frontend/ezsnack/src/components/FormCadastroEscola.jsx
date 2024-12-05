import React, { useState } from "react";

const FormCadastroEscola = () => {
    const [formData, setFormData] = useState({
        nome: "",
        cnpj: "",
        telefone: "",
        estado: "",
        cidade: "",
        qtAlunos: "",
        usuario: "",
        senha: "",
    });
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Dados da instituição",
            description: "Informações sobre a instituição.",
            iconPath: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z",
        },
        {
            title: "Dados de usuário",
            description: "Informações do usuário responsável.",
            iconPath: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
        },
        {
            title: "Review",
            description: "Verifique suas informações.",
            iconPath: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    // Estado para controlar a visibilidade da senha
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cadastro da Escola
            const responseEscola = await fetch("http://localhost:8080/escola", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    cnpj: formData.cnpj,
                    telefone: formData.telefone,
                    estado: formData.estado,
                    cidade: formData.cidade,
                    qtAlunos: formData.qtAlunos,
                }),
            });
    
            if (responseEscola.ok) {
                const escolaData = await responseEscola.json();
                const escolaId = escolaData.id; // Supondo que a resposta contém o ID da escola criada
    
                // Cadastro do Usuário ADMIN_ESCOLA
                const usuarioData = {
                    user: formData.usuario, // Nome de usuário
                    senha: formData.senha, // Senha do usuário
                    escolaId: escolaId, // ID da escola criada
                    responsavelId: null, // Se não aplicável
                    nome: null, // Pode ser null
                    identificacao: null, // Pode ser null
                    tipo: "ADMIN_ESCOLA", // Tipo de usuário
                };
    
                const responseUsuario = await fetch("http://localhost:8080/usuarios/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(usuarioData),
                });
    
                if (responseUsuario.ok) {
                    alert("Usuário ADMIN_ESCOLA criado com sucesso!");
                    // Resetar o formulário
                    setFormData({
                        nome: "",
                        cnpj: "",
                        telefone: "",
                        estado: "",
                        cidade: "",
                        qtAlunos: "",
                        usuario: "",
                        senha: "",
                    });
                    setCurrentStep(0);
                } else {
                    const errorResponse = await responseUsuario.json();
                    console.error("Erro ao cadastrar usuário:", errorResponse);
                    alert("Erro ao cadastrar usuário ADMIN_ESCOLA: " + errorResponse.message);
                }
            } else {
                const errorResponse = await responseEscola.json();
                console.error("Erro ao cadastrar escola:", errorResponse);
                alert("Erro ao cadastrar escola: " + errorResponse.message);
            }
        } catch (error) {
            console.error("Erro ao conectar com a API:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };
    
    

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Steps Section */}
            <div>
                <h2 className="sr-only">Steps</h2>

                <div>
                    <ol className="grid grid-cols-1 divide-x-2 divide-black overflow-hidden rounded-lg border-2 border-black text-sm text-gray-500 sm:grid-cols-3">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`flex items-center justify-center gap-2 p-4 ${currentStep === index ? "bg-[#fac141] text-black" : ""}`}
                            >
                                <svg
                                    className="size-7 shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                                </svg>

                                <p className="leading-none">
                                    <strong className="block font-medium">{step.title}</strong>
                                    <small className="mt-1">{step.description}</small>
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : handleNext} className="flex flex-col items-center mt-6">
    <div className="w-full max-w-md">
        {/* Coluna 1 - Inputs de Dados da Instituição */}
        {currentStep === 0 && (
            <div className="flex flex-col space-y-4">
                <h2 className="text-black text-xl text-center"></h2>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome da instituição"
                    className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11"
                    required
                />
                <div className="flex space-x-4 w-full">
                    <input
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="Telefone da instituição"
                        className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11 w-1/2"
                        required
                    />
                    <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        placeholder="CNPJ da instituição (ex: XX.XXX.XXX/0001-XX)"
                        className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11 w-1/2"
                        required
                    />
                </div>
                <div className="flex space-x-4 w-full">
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11 w-1/2"
                        required
                    >
                        <option disabled value="">Estado</option>
                        {/* Adicione opções de estado aqui */}
                        {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((uf) => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        placeholder="Cidade"
                        className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11 w-1/2"
                        required
                    />
                </div>
                <input
                    type="number"
                    name="qtAlunos"
                    value={formData.qtAlunos}
                    onChange={handleChange}
                    placeholder="Quantidade de alunos"
                    className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11"
                    required
                />
            </div>
        )}

                    {/* Coluna 2 - Inputs de Dados de Usuário */}
                    {currentStep === 1 && (
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-black text-xl text-center"></h2>
                            <input
                                type="text"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                placeholder="Nome de usuário"
                                className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11"
                                required
                            />
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                placeholder="Senha"
                                className="text-black text-base bg-gray-200 font-alexandria font-semibold border border-black rounded p-2 shadow-md shadow-gray-600 h-11"
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Exibir dados na etapa de revisão */}
            {currentStep === steps.length - 1 && (
                <div className="mt-8 border-2 border-black rounded-md">
                    <h2 className="text-black text-xl text-center mt-2 pb-2 border-b-2 border-black">Revise os dados</h2>
                    <div className="flow-root rounded-lg py-3">
                        <dl className="-my-3 text-sm">
                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Nome da Instituição</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.nome}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">CNPJ</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.cnpj}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Telefone</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.telefone}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Estado</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.estado}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Cidade</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.cidade}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Quantidade de Alunos</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.qtAlunos}</dd>
                            </div>

                            <div className="grid grid-cols-1 border-b border-black gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Nome de Usuário</dt>
                                <dd className="text-gray-700 sm:col-span-2">{formData.usuario}</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-black">Senha</dt>
                                <dd className="text-gray-700 sm:col-span-2 flex items-center">
                                    <span>{isPasswordVisible ? formData.senha : "●●●●●●●●"}</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="ml-2 text-blue-500 hover:underline"
                                    >
                                        {isPasswordVisible ? "Ocultar" : "Exibir senha"}
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            )}

                {/* Botões de Navegação */}
                <div className="flex justify-between mt-8">
                    {currentStep > 0 && (
                        <div className="relative inline-block mt-2">
                            <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)} // Função para voltar ao step anterior
                                className="relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 w-48 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                            >
                                Voltar
                            </button>
                        </div>
                    )}
                    
                    {currentStep < steps.length - 1 ? (
                        <div className="relative inline-block mt-2 ml-4"> {/* Adicionado espaçamento à esquerda */}
                            <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                            <button
                                type="submit"
                                className="relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 w-48 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                            >
                                Próximo
                            </button>
                        </div>
                    ) : (
                        <div className="relative inline-block mt-2 ml-4"> {/* Adicionado espaçamento à esquerda */}
                            <div className="absolute inset-0 border-dashed border-2 border-black rounded h-11"></div>
                            <button
                                type="submit"
                                className="relative text-black bg-[#fac141] text-xl font-alexandria font-semibold px-4 border-2 border-black rounded h-11 w-48 hover:shadow-md shadow-gray-600 transition duration-600 transform hover:-translate-y-1 hover:translate-x-1"
                            >
                                Cadastrar
                            </button>
                        </div>
                    )}
                </div>



                
            </form>
        </div>
    );
};

export default FormCadastroEscola;
