import { Request, Response } from "express";
import crypto from 'crypto';
import pool from "../../database";
import { ResponseModel } from "../models/response";

const authController: any = {};

authController.register = async (req: Request, res: Response) => {

    const responseJson : ResponseModel = new ResponseModel();
    
    const { dni, fullname, email, phone } = req.body;

    const validate = validateRegister(req);
    
    if (!validate.success) {
        return res.status(400).json(validate);
    }

    try {
        //guardar en la db el usuario
        const connection = await pool.getConnection();

        const [user]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (user.length > 0) {
            connection.release();
            responseJson.code = 400;
            responseJson.success = false;
            responseJson.message = 'El correo electrónico ya se encuentra registrado';
            responseJson.data = null;
            return res.status(400).json(responseJson);
        }

        const [userDni]: any = await connection.query('SELECT * FROM users WHERE dni = ?', [dni]);

        if (userDni.length > 0) {
            connection.release();
            responseJson.code = 400;
            responseJson.success = false;
            responseJson.message = 'El número de documento ya se encuentra registrado';
            responseJson.data = null;
            return res.status(400).json(responseJson);
        }

        const [result]: any = await connection.query('INSERT INTO users (dni, fullname, email, phone) VALUES (?, ?, ?, ?)', [dni, fullname, email, phone]);
        const userId = result.insertId;

        await connection.query('INSERT INTO wallets (id_user) VALUES (?)', [userId]);

        connection.release();
        responseJson.code = 200;
        responseJson.success = true;
        responseJson.message = 'Usuario registrado correctamente';
        
        responseJson.data = {
            dni,
            fullname,
            email,
            phone
        };

        return res.status(200).json(responseJson);

    } catch (error) {
        console.log('Error al registrar usuario', error);
        responseJson.code = 500;
        responseJson.success = false;
        responseJson.message = 'Error al registrar usuario';
        responseJson.data = null;
        return res.status(500).json(responseJson);
    }

};

function validateRegister(req: Request) {

    const responseJson : ResponseModel = new ResponseModel();
    responseJson.code = 400;
    responseJson.success = true;
    responseJson.data = null;

    if (!req.body.dni) {
        responseJson.message = 'El número de identificación es requerido';
        responseJson.success = false;
    }

    if (!req.body.fullname) {
        responseJson.message = 'El nombre es requerido';
        responseJson.success = false;
    }

    if (!req.body.email) {
        responseJson.message = 'El correo electrónico es requerido';
        responseJson.success = false;
    }
    
    if (!req.body.phone) {
        responseJson.message = 'El número de teléfono es requerido';
        responseJson.success = false;
    }

    return responseJson;
}

export default authController;