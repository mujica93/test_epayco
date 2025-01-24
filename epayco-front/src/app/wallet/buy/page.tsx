"use client"
import React from 'react'
import { Button } from '@heroui/react'
import useWallet from '@hooks/wallet/useWallet';
import ModalInfo from '@components/modal-info/ModalInfo';
import ModalLoading from '@components/modal-loading/ModalLoading';

const chargePage = () => {

    const { onlyNumbers, onlyAmounts, dni, setDni, phone, setPhone, amount, setAmount, handlerBuyWallet, errorMessages, errors, showModalInfo, showModalLoading, modalInfoMessage, onBlurInput } = useWallet();

    return (
        <div className="flex flex-col items-center justify-center bg-background text-foreground mt-20">
        
            <div className='flex flex-col items-center justify-center w-full max-w-md p-8'> 
                <img src="/images/epayco_logo.png" alt="" />
            </div>
        
            <div className='flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-1' style={{ borderColor: '#1c0e49'}}> 
                
                <div className="flex flex-col items-center justify-center w-full max-w-md p-8"> 
                    <h1 className="text-2xl font-bold">Realizar compra</h1>
                </div>

                <div className="flex flex-col w-full max-w-md mb-5">
                    
                    <label className="text-sm font-semibold m-1">Número de documento</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 p-2 rounded-lg" 
                        placeholder='123456789' 
                        onChange={(e)=>onlyNumbers(e.target.value, setDni)} 
                        value={dni} 
                        style={{
                            borderColor : errors.includes('dni') ? 'red' : 'gray'
                        }}
                        onBlur={(e)=>onBlurInput(e.target.value,'dni','buy')}
                    />
                    
                    {
                        errors.includes('dni') && <p className="text-red-500 text-sm m-1">{errorMessages.dni}</p>
                    }

                </div>

                <div className="flex flex-col w-full max-w-md mb-5">
                    
                    <label className="text-sm font-semibold m-1">Número de teléfono</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 p-2 rounded-lg" 
                        placeholder='123456789' 
                        onChange={(e)=>onlyNumbers(e.target.value, setPhone)} 
                        value={phone} 
                        style={{
                            borderColor : errors.includes('dni') ? 'red' : 'gray'
                        }}
                        onBlur={(e)=>onBlurInput(e.target.value,'phone','buy')}
                    />
                    
                    {
                        errors.includes('phone') && <p className="text-red-500 text-sm m-1">{errorMessages.phone}</p>
                    }

                </div>

                <div className="flex flex-col w-full max-w-md mb-5">
                    
                    <label className="text-sm font-semibold m-1">Monto</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 p-2 rounded-lg" 
                        placeholder='123456789' 
                        onChange={(e)=>onlyAmounts(e.target.value, setAmount)} 
                        value={amount} 
                        style={{
                            borderColor : errors.includes('dni') ? 'red' : 'gray'
                        }}
                        onBlur={(e)=>onBlurInput(e.target.value,'ammount','buy')}
                    />
                    
                    {
                        errors.includes('ammount') && <p className="text-red-500 text-sm m-1">{errorMessages.ammount}</p>
                    }

                </div>

                <div className="flex flex-col w-full max-w-md mb-5">
                    
                    <Button 
                        className="mb-3" 
                        onClick={handlerBuyWallet}
                        style={{ 
                            backgroundColor: '#1c0e49',
                            borderColor: '#3B82F6',
                            color: '#fff',
                            fontSize: 15
                        }}
                    >
                        Realizar compra
                    </Button>

                </div>
                
            </div>

            {
                showModalInfo && <ModalInfo 
                    title='Compra con Billetera' 
                    message={modalInfoMessage} 
                />
            }

            {
                showModalLoading && <ModalLoading 
                    title='Espere un momento realizando la compra'
                />
            }

        </div>
    )

}

export default chargePage;