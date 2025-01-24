"use client"
import React from 'react';
import useWallet from '@hooks/wallet/useWallet';
import ModalLoading from '@components/modal-info/ModalInfo';
import ModalInfo from '@components/modal-info/ModalInfo';

const confirmBuyPage = () => {
    
    const { showModalLoading, showModalInfo, modalInfoMessage, isLoad, closeManual } = useWallet();

    return (

        <>

            {
                showModalLoading && !showModalInfo && isLoad && <ModalLoading title='Espere un momento ...' message='Estamos procesando su compra'/>
            }

            {
                !showModalLoading && showModalInfo && isLoad && <ModalInfo title='Confirmacion de compra' message={ modalInfoMessage } openModal={showModalInfo} onCloseManual={closeManual} />
            }

            {
                !showModalLoading && !showModalInfo && !isLoad &&
                <div className="flex flex-col items-center justify-center bg-background text-foreground mt-48">
                        
                    <div className='flex flex-col items-center justify-center w-full max-w-md p-8'> 
                        <img src="/images/epayco_logo.png" alt="" />
                    </div>
                
                    <div className='flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-1' style={{ borderColor: '#1c0e49'}}> 
                        
                        <div className="flex flex-col items-center justify-center w-full max-w-md p-8"> 
                            <h1 className="text-3xl font-bold">
                                Compra exitosa 
                            </h1>

                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-full max-w-md p-8"> 
                            <p className="text-xl font-bold">
                                Gracias por confiar en nosotros
                            </p>

                        </div>
                    
                    </div>

                </div>
            }

        </>



    );
};

export default confirmBuyPage