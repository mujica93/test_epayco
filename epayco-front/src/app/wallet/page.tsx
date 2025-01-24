"use client"
import React from 'react';

const walletPage = () => {

    return (
        <div className="flex flex-col items-center justify-center bg-background text-foreground">
        
            <div className='flex flex-col items-center justify-center w-full max-w-md p-8'> 
                <img src="/images/epayco_logo.png" alt="" />
            </div>
        
            <div className='flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-gray-500 border-1'> 
                
                <h1 className="text-2xl font-bold">
                    Bienvenido al sistema
                </h1>
                <p className="text-xl font-bold">
                    Aqui podras realizar:
                </p>
                {/* 
                    creamos una lista de las opciones que tendra el usuario 
                */}

                <div className="flex flex-col items-center justify-center w-full max-w-md mt-5 mb-5"> 
                    <ul>
                        <li className='font-bold text-md mt-5 mb-5'>
                            Registro de usuario
                        </li>

                        <li className='font-bold text-md mt-5 mb-5'>
                            Realizar compras
                        </li>

                        <li className='font-bold text-md mt-5 mb-5'>
                            Recargar y consultar el saldo de la billetera
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    )
};

export default walletPage;