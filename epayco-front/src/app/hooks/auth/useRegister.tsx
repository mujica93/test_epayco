"use client";
import { useState } from 'react';
import useAuth from '@hooks/auth/useAuth';
import apiServices  from '@api/apiServices';
import { UserRegister } from '../../models/user.interface';

const useRegister = () => {
    
    //api services
    const { register } = apiServices();

    //hooks
    const { saveUser } = useAuth();
    
    //states
    const [dni, setDni] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [errors, setErrors] = useState<any[]>([]);
    const [fullname, setFullname] = useState<string>('');
    const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
    const [modalInfoMessage, setModalInfoMessage] = useState<string>('');
    const [showModalLoading, setShowModalLoading] = useState<boolean>(false);
    const [ errorMessages, setErrorMessages ] = useState<any>({
        dni: '',
        phone: '',
        email: '',
        fullname: '',
        required: 'Este campo es requerido',
    });


    const handleRegister = () => {
        validateForm();
        setShowModalLoading(true);

        if (errors.length > 0) {
            setShowModalLoading(false);
            setErrors(errors);
            return;
        } else {

            const user: UserRegister = {
                email,
                dni,
                phone,
                fullname,
            } 

            register(user).then((response: any) => {
                if (response.success) {
                    setShowModalLoading(false);
                    setModalInfoMessage(response.message);
                    handleModalInfo(5000);
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

    const validateEmail = (email: string) => {

        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (email.trim() !== '' && !pattern.test(email)) {
            console.log('entro');
            setErrors([...errors, 'email']);
            setErrorMessages((prev: any) => ({ ...prev, email: 'El correo electronico no es valido' }));
        };

        if (email.trim() !== '' && pattern.test(email)) {
            setErrors(errors.filter((error: any) => error !== 'email'));
            setErrorMessages({ ...errorMessages, email: '' });
        }
    };

    const validateForm = () => {
        
        if (dni.trim() === '') {
            setErrors((prev: any) => ([...prev, 'dni']));
            setErrorMessages((prev: any) => ({ ...prev, dni: 'Este campo es requerido' }));
            
        }

        if (email.trim() === '') {
            setErrors((prev: any) => ([...prev, 'email']));
            setErrorMessages((prev: any) => ({ ...prev, email: 'Este campo es requerido' }));
        }

        if (phone.trim() === '') {
            setErrors((prev: any) => ([...prev, 'phone'] ));
            setErrorMessages((prev: any) => ({ ...prev, phone: 'Este campo es requerido' }));
        }

        if (fullname.trim() === '') {
            setErrors((prev: any) => ([...prev, 'fullname']));
            setErrorMessages((prev: any) => ({ ...prev, fullname: 'Este campo es requerido' }));
        }

    };

    const onBlurInput = (input: any, event: any) => {

        if (event.target.value.trim() === '') {
            validateForm();
        }else {
            setErrors(errors.filter((error: any) => error !== input));
            setErrorMessages((prev: any) => ({ ...prev, [input]: '' }));
        }
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

    const handleModalInfo = (time: number = 3500) => {
        setShowModalInfo(true);
        setTimeout(() => {
            setShowModalInfo(false);
        }, time);
    };

    const emptyFields = () => {
        setDni('');
        setEmail('');
        setPhone('');
        setFullname('');
    };

    return {
        dni,
        email,
        phone,
        errors,
        setDni,
        fullname,
        setEmail,
        setPhone,
        onlyNumbers,
        onBlurInput,
        setFullname,
        validateForm,
        errorMessages,
        showModalInfo,
        validateEmail,
        handleRegister,
        modalInfoMessage,
        showModalLoading,
    }

};

export default useRegister;