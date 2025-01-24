import React from 'react';
import { ModalProps } from '@/app/models/modal.interface';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';

const ModalInfo = ({ title, message, onCloseManual, openModal}: ModalProps) => {
    
    return (
        <Modal isOpen={openModal??true}>
            <ModalContent>
                  
                <ModalHeader className="flex flex-col gap-1 items-center justify-center">
                    <p className='text-xl font-bold'>
                        {title}
                    </p>
                </ModalHeader>
                <ModalBody
                    className='flex flex-col gap-1 items-center justify-center text-center'
                >
                    <p className='text-lg mt-2 mb-5 text-center'>
                        {message}
                    </p>
                </ModalBody>

                {
                    onCloseManual && (

                    <ModalFooter
                        className='flex items-center justify-center'
                    >
                        <Button onClick={onCloseManual} color="primary" size="lg" className='w-56'>
                            Cerrar
                        </Button>
                    </ModalFooter>
                    )
                }
                  
            </ModalContent>
        </Modal>
    );

};

export default ModalInfo;