"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import useRegister from '@hooks/auth/useRegister';
import ModalInfo from '@components/modal-info/ModalInfo';
import ModalLoading from '@components/modal-loading/ModalLoading';

const RegisterPage = () => {
  
  const { dni, email, phone, errors, setDni, fullname, setEmail, setPhone, setFullname, errorMessages, validateEmail, handleRegister, onBlurInput, onlyNumbers, showModalInfo, showModalLoading, modalInfoMessage } = useRegister();
  
  return (

    <div className="flex flex-col items-center justify-center bg-background text-foreground mt-10">
        
        <div className='flex flex-col items-center justify-center w-full max-w-md p-8'> 
          <img src="/images/epayco_logo.png" alt="" />
        </div>
        
        <div className='flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-1' style={{ borderColor: '#1c0e49'}}> 
            <h1 className="text-2xl font-semibold mb-5">Registro de usuario</h1>

            <div className="flex flex-col w-full max-w-md mb-5">
                
              <label className="text-sm font-semibold m-1">Correo electrónico</label>
              <input 
                  type="text" 
                  value={email}
                  onBlur={(e)=>onBlurInput('email', e)}
                  placeholder='Example@example.com' 
                  className="border-1 border-gray-300 p-2 rounded-lg"
                  style={{ borderColor: errorMessages.email ? 'red' : 'gray'}}
                  onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value);}} 
                />
              
              {
                errorMessages.email !== "" && <p className="text-red-500 text-sm m-1">{errorMessages.email}</p>
              }

              
            </div> 

            <div className="flex flex-col w-full max-w-md mb-5">
                
              <label className="text-sm font-semibold m-1">Nombre completo</label>
              <input 
                type="text" 
                value={fullname} 
                onBlur={(e)=>{onBlurInput('fullname', e)}}
                placeholder='Jonh Doe' 
                onChange={(e) => {setFullname(e.target.value); }} 
                className="border-1 border-gray-300 p-2 rounded-lg"
                style={{ borderColor: errorMessages.fullname ? 'red' : 'gray'}}
              />
              
              {
               errorMessages.fullname !== ""  && <p className="text-red-500 text-sm m-1">{errorMessages.fullname}</p>
              }

            </div>

            <div className="flex flex-col w-full max-w-md mb-5">
                
              <label className="text-sm font-semibold m-1">Número de documento</label>
              <input 
                type="text" 
                value={dni} 
                onBlur={(e)=>onBlurInput('dni', e)}
                placeholder='123456789' 
                onChange={(e) => onlyNumbers(e.target.value, setDni)} 
                style={{ borderColor: errorMessages.dni ? 'red' : 'gray'}}
                className="border-1 border-gray-300 p-2 rounded-lg"
              />
              
              {
               errorMessages.dni !== ""  && <p className="text-red-500 text-sm m-1">{errorMessages.dni}</p>
              }

            </div>

            <div className="flex flex-col w-full max-w-md mb-5">
                
              <label className="text-sm font-semibold m-1">Número de Teléfono</label>
              <input 
                type="text" 
                value={phone}
                onBlur={(e)=>onBlurInput('phone', e)}
                onChange={(e) => onlyNumbers(e.target.value, setPhone)} 
                placeholder='123-456-7890' 
                style={{ borderColor: errorMessages.phone ? 'red' : 'gray'}}
                className="border-1 border-gray-300 p-2 rounded-lg"
              />
              
              {
               errorMessages.phone !== ""  && <p className="text-red-500 text-sm m-1">{errorMessages.phone}</p>
              }

            </div>

            <div className="flex flex-col w-full max-w-md mb-5">
                
              <Button 
                  className="mb-3" 
                  onClick={handleRegister}
                  style={{ 
                    backgroundColor: '#1c0e49',
                    borderColor: '#3B82F6',
                    color: '#fff',
                    fontSize: 15
                  }}
              >
                  Registrarse
              </Button>

            </div>
            
        </div>
        
        {
          showModalInfo && <ModalInfo title='Registro de usuario' message={modalInfoMessage} />
        }

        {
          showModalLoading && <ModalLoading title='Registrando usuario'/>
        }
    </div>


  )
}

export default RegisterPage