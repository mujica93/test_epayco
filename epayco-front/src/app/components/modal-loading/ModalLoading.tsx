import React from 'react';
import { Progress } from '@heroui/progress';
import { ModalProps } from '@/app/models/modal.interface';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';

const ModalLoading = ({ title }: ModalProps) => {

    return (
        <>
            <Modal isOpen={true}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 items-center justify-center">
                        <p className='text-xl font-bold'>
                            {title}
                        </p>
                    </ModalHeader>
                    <ModalBody className='flex items-center justify-center text-lg'>
                        <Progress
                            isIndeterminate
                            aria-label="progress bar"
                            className="max-w-md w-full mt-2 mb-10" 
                            size="lg"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );

};

export default ModalLoading;