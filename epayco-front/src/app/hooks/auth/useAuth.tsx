"use client";
import React from 'react';

const useAuth = () => {
    
    const saveUser = (user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
    };

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user') || '{}');
    };

    return {
        getUser,
        saveUser,
    };

};

export default useAuth;