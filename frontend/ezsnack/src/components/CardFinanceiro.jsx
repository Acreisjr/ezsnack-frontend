import arrow from '../assets/arrowDown.png';
import { useState, useEffect } from 'react';

// A página não vai renderizar nada até a parte de criação de contas mobile estar pronta;
// O CardFinanceiro é dependente da existência de ao menos 1 pedido entregue;
// TODO: Mensagem de erro para quando não existirem pedidos entregues

const CardFinanceiro = () => {
    const [pedidosAgrupados, setPedidosAgrupados] = useState({});

    const loadPedidos = async () => {
        try {
            const response = await fetch('http://localhost:8080/pedidos', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos.');
            }

            const pedidosData = await response.json();
            

            const pedidosPorMes = pedidosData.reduce((listaPedidos, pedido) => {
                const dataPedido = new Date(pedido.data);
                const mesAno = `${dataPedido.getMonth() + 1}/${dataPedido.getFullYear()}`;
                
                if (!listaPedidos[mesAno]) {
                    listaPedidos[mesAno] = { pedidos: [], totalMes: 0 };
                }
                
                if(pedido.status === 'Entregue') {
                    listaPedidos[mesAno].pedidos.push(pedido);
                    listaPedidos[mesAno].totalMes += pedido.precoTotal;
                }
                

                return listaPedidos;
            }, {});
            
            setPedidosAgrupados(pedidosPorMes);
        } catch (e) {
            console.error('Erro ao buscar pedidos: ', e);
        }
    };

    useEffect(() => {
        loadPedidos();
    }, []);

    return (
        <div className="relative mx-auto  flex flex-col my-6 bg-transparent shadow-sm border-2 border-black rounded-lg w-full max-w-4xl">
            {Object.entries(pedidosAgrupados).map(([mesAno, { pedidos, totalMes }]) => (
                <div key={mesAno} className="border-b-2 border-black">
                    <div className="relative mx-3 mb-0 border-b-2 border-black pt-3 pb-2 px-1 flex items-center justify-between">
                        <span className="text-3xl font-alexandria font-semibold uppercase">{mesAno}</span>
                        <div className="flex items-center">
                            <p className="mr-3 text-2xl font-medium">R$ {totalMes.toFixed(2)}</p>
                            <div className="relative inline-block">
                                <button className="p-1 border-0 cursor-pointer hover:scale-110 transition duration-300">
                                    <img src={arrow} alt="Expandir" className="h-6 w-6 mr-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="relative mx-3 ml-10 mb-2 pt-6 pb-6 px-1 flex items-center justify-between">
                            <div className="w-full flex flex-col">
                                <div className="flex justify-between items-center">
                                    <div className="w-full border-b-2 border-black">
                                        <p className="mb-3 text-2xl font-alexandria font-semibold">{new Date(pedido.data).toLocaleDateString()}</p>
                                        <p className="mb-3 text-2xl font-alexandria font-semibold">Saldo do dia: <span className="text-green-500">+ R$ {pedido.precoTotal.toFixed(2)}</span></p>
                                    </div>
                                    <div className="relative inline-block">
                                        <button className="p-1 border-0 cursor-pointer hover:scale-110 transition duration-300">
                                            <img src={arrow} alt="Expandir" className="h-6 w-6 mr-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p>+ R$ {pedido.precoTotal.toFixed(2)} - Pedido {pedido.id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CardFinanceiro;
