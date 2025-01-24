import axios from 'axios';
import { ConfirmPayment, WalletCharge } from '../models/wallet.interface';

const apiConection = axios.create({
    baseURL: process.env.API_URL_BASE || 'http://localhost:8000/',
});
const apiServices = () => {
  
    const login = async (user: any) => {
        
        const response = await apiConection.post('auth/login', user);

        return response.data;

    };
    
    const register = async (user: any) => {
        
        const response = await apiConection.post('auth/register', user);

        return response.data;
    };

    const logout = async () => {
        
        const response = await apiConection.post('/logout');

        return response.data;
    };

    const getWallet = async (data: WalletCharge) => {
        
        const response = await apiConection.get(`pay/balance?`, { params: data });

        return response.data;
    };

    const chargeWallet = async (charge: WalletCharge) => {
        
        const response = await apiConection.post(`pay/recharge`, charge);

        return response.data;
    };

    const buyWithWallet = async (payment: WalletCharge) => {
        
        const response = await apiConection.post(`pay/payment`, payment);

        return response.data;
    };

    const confirmPayment = async (dataPayment: ConfirmPayment) => {
        
        const response = await apiConection.post(`pay/confirmPayment`, dataPayment );

        return response.data;
    };

    return {
        login,
        logout,
        register,
        getWallet,
        chargeWallet,
        buyWithWallet,
        confirmPayment
    }
}

export default apiServices;