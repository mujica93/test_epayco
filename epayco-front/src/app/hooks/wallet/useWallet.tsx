"use client"
import React, { useState, useEffect } from 'react';
import apiServices from '@api/apiServices';
import { useParams, useRouter } from 'next/navigation';
import { ConfirmPayment, WalletCharge } from '@/app/models/wallet.interface';

const useWallet = () => {

    // api services
    const { getWallet, chargeWallet, buyWithWallet, confirmPayment } = apiServices();

    
    // router
    const router: any = useParams();
    const navigate: any = useRouter();
    const paramToken = router.params ? router.params[1] : '';
    const paramSession = router.params ? router.params[0] : '';

    //states
    const [dni, setDni] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [errors, setErrors] = useState<any[]>([]);
    const [amount, setAmount] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [token, setToken] = useState<string>(paramToken);
    const [sessionId, setSessionId] = useState<string>(paramSession);
    const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
    const [modalInfoMessage, setModalInfoMessage] = useState<string>('');
    const [showModalLoading, setShowModalLoading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<any>({
        dni: '',
        phone: '',
        amount: '',
        required: 'El campo es requerido',
    });

    const handlerChargeWallet = () => {

        setShowModalLoading(true);
        validateChargeForm();

        if (errors.length > 0) {
            return;
        }else {

            const charge: WalletCharge = {
                dni,
                phone,
                amount: amount,
            }

            chargeWallet(charge).then((response: any) => {

                if (response.success) {
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                    emptyFields();
                }else{
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                }
                
            }).catch((error: any) => {
                console.log("error",error.response);
                setShowModalLoading(false);
                handleModalInfo(5000);
                setModalInfoMessage(error.response.data.message);
            });
        }

    };

    const handlerDetailWallet = () => { 
        setShowModalLoading(true);
        validateDetailForm();

        if (errors.length > 0) {
            return;
        }else {

            const wallet: WalletCharge = {
                dni,
                phone,
            };

            setShowModalLoading(true);
            getWallet(wallet).then((response: any) => {
                
                if (response.success) {
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                    emptyFields();
                }else{
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                }
                
            }).catch((error: any) => {
                console.log("error",error.response);
                setShowModalLoading(false);
                handleModalInfo(5000);
                setModalInfoMessage(error.response.data.message);
            });
        }
    };

    const handlerBuyWallet = () => {
        setShowModalLoading(true);
        validateBuyForm();

        if (errors.length > 0) {
            return;
        }else {

            const payment: WalletCharge = {
                dni,
                phone,
                amount: amount,
            };

            buyWithWallet(payment).then((response: any) => {
                if (response.success) {
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                    emptyFields();
                }else{
                    setShowModalLoading(false);
                    handleModalInfo(5000);
                    setModalInfoMessage(response.message);
                }
            }).catch((error: any) => {
                console.log("error",error.response);
                setShowModalLoading(false);
                handleModalInfo(5000);
                setModalInfoMessage(error.response.data.message);
            });
        }
    };

    const handlerConfirmBuy = () => {
        setShowModalLoading(true);

        const dataConfirm: ConfirmPayment = {
            sessionId,
            token,
        };

        confirmPayment(dataConfirm).then((response: any) => {
            if (response.success) {
                setTimeout(() => {
                    setShowModalLoading(false);
                    setIsLoad(false);
                }, 5000);
            }else{
                setShowModalLoading(false);
                setModalInfoMessage(response.message);
                setShowModalInfo(true);
            }
        }).catch((error: any) => {
            console.log("error",error.response);
            setShowModalLoading(false);
            setModalInfoMessage(error.response.data.message);
            setShowModalInfo(true);
        });
    };

    const validateChargeForm = () => {

        let newErrors = [...errors];
        let newErrorMessages = {...errorMessages};
    
        if (dni.trim() === '') {
            newErrors.push('dni');
            newErrorMessages.dni = errorMessages.required;
        }
    
        if (phone.trim() === '') {
            newErrors.push('phone');
            newErrorMessages.phone = errorMessages.required;
        }
    
        if (amount.trim() === '') {
            newErrors.push('amount');
            newErrorMessages.amount = errorMessages.required;
        }
    
        if (amount === '0') {
            newErrors.push('amount');
            newErrorMessages.amount = 'El monto debe ser mayor a 0';
        }
        
        setErrors(newErrors);
        setErrorMessages(newErrorMessages);
    };

    const validateDetailForm = () => {
        let newErrors = [...errors];
        let newErrorMessages = {...errorMessages};
    
        if (dni.trim() === '') {
            newErrors.push('dni');
            newErrorMessages.dni = errorMessages.required;
        }
    
        if (phone.trim() === '') {
            newErrors.push('phone');
            newErrorMessages.phone = errorMessages.required;
        }

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);
    };

    const validateBuyForm = () => {
        let newErrors = [...errors];
        let newErrorMessages = {...errorMessages};
        
        if (dni.trim() === '') {
            newErrors.push('dni');
            newErrorMessages.dni = errorMessages.required;
        }

        if (phone.trim() === '') {
            newErrors.push('phone');
            newErrorMessages.phone = errorMessages.required;
        }

        if (amount.trim() === '') {
            newErrors.push('amount');
            newErrorMessages.amount = errorMessages.required;
        }
    
        if (amount === '0') {
            newErrors.push('amount');
            newErrorMessages.amount = 'El monto debe ser mayor a 0';
        }
        
        setErrors(newErrors);
        setErrorMessages(newErrorMessages);
    };

    const onlyNumbers = (event: any, setState: (value: string) => void) => {
        // solo puedo ingresar numeros en el input
        const value = event;
        const regex = /^[0-9]*$/;
    
        if (regex.test(value)) {
            // si es un numero seteo el estado
            setState(value);
        }
    };
    
    const onlyAmounts = (event: any, setState: (value: string) => void) => {
        // solo puedo ingresar numeros en el input , un punton y dos decimales
        const value = event;
        const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    
        if (regex.test(value)) {
            setState(value);
        }
    };

    const onBlurInput = (e: any,input: string, form: string) => {
        if (e.trim() === '') {
            if (form === 'charge') {
                validateChargeForm();
            }
            if (form === 'detail') {
                validateDetailForm();
            }
            if (form === 'buy') {
                validateBuyForm();
            }
        }else {
            setErrors(errors.filter((error: any) => error !== input));
            setErrorMessages((prev: any) => ({ ...prev, [input]: '' }));
        }
    }; 

    const handleModalInfo = (time: number = 3500) => {
        setShowModalInfo(true);
        setTimeout(() => {
            setShowModalInfo(false);
        }, 3500);
    };

    const emptyFields = () => {
        setDni('');
        setPhone('');
        setAmount('');
    };

    const closeManual = () => {
        setShowModalInfo(false);
        navigate.push('/');
    };

    useEffect(() => {

        if (token && sessionId) {
            handlerConfirmBuy();
            
        }
    }, [sessionId, token]);

    return {
        dni,
        phone,
        errors,
        setDni,
        amount,
        isLoad,
        fullname,
        setPhone,
        setAmount,
        onlyNumbers,
        onlyAmounts,
        onBlurInput,
        closeManual,
        errorMessages,
        showModalInfo,
        validateBuyForm,
        modalInfoMessage,
        showModalLoading,
        handlerBuyWallet,
        handlerConfirmBuy,
        validateChargeForm,
        handlerDetailWallet,
        handlerChargeWallet,
    }
};

export default useWallet;