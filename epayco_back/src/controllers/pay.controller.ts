import { Request, Response } from "express";
import crypto from 'crypto';
import pool from "../../database";
import { sendEmail } from "../../mailer"
import { ResponseModel } from "../models/response";

const payController: any = {}; 

payController.recharge = async (req: Request, res: Response) => {

    const responseJson : ResponseModel = new ResponseModel();
    
    const { dni, phone ,amount } = req.body;

    const validate = validateRecharge(req);
    
    if (!validate.success) {
        return res.status(400).json(validate);
    }

    //validar que la wallet exista y pertenezca al usuario

    const validWallet = await validateWallet(dni, phone);

    if (!validWallet) {
        responseJson.code = 404;
        responseJson.success = false;
        responseJson.message = 'Billetera no encontrada';
        return res.status(404).json(responseJson);
    }

    try {
        //recargar saldo en la billetera
        const connection = await pool.getConnection();
        const [user]: any = await connection.query('SELECT id FROM users WHERE dni = ?', [dni]);
        const userId = user[0].id;
        await connection.query('UPDATE wallets SET balance = balance + ? WHERE id_user = ?', [amount, userId]);

        connection.release();
        responseJson.code = 200;
        responseJson.success = true;
        responseJson.message = 'Recarga de saldo exitosa';
        return res.status(200).json(responseJson);
    } catch (error) {
        console.log('Error al recargar saldo', error);
        responseJson.code = 500;
        responseJson.success = false;
        responseJson.message = 'Error al recargar saldo';
        return res.status(500).json(responseJson);
    }

};

payController.balance = async (req: Request, res: Response) => {
    
    const responseJson : ResponseModel = new ResponseModel();
    
    const { dni, phone }: any = req.query;

    const validate = validateBalance(req);

    if (!validate.success) {
        return res.status(400).json(validate);
    }
    //validar que la wallet exista y pertenezca al usuario.
    const validWallet = await validateWallet(dni.toString(), phone.toString());

    if (!validWallet) {
        responseJson.code = 404;
        responseJson.success = false;
        responseJson.message = 'Billetera no encontrada';
        return res.status(404).json(responseJson);
    }

    try {
        //consultar saldo
        const connection = await pool.getConnection();
        const [user]: any = await connection.query('SELECT w.balance FROM wallets w INNER JOIN users u ON w.id_user = u.id WHERE u.dni = ? AND u.phone = ?', [dni, phone]);
        connection.release();
        if (user.length === 0) {
            responseJson.code = 404;
            responseJson.success = false;
            responseJson.message = 'Usuario no encontrado';
            return res.status(404).json(responseJson);
        }
        responseJson.code = 200;
        responseJson.success = true;
        responseJson.message = `El saldo de la billetera es: ${user[0].balance}`;
        responseJson.data = user[0];
        return res.status(200).json(responseJson);
    } catch (error) {
        console.log('Error al obtener el saldo', error);
        responseJson.code = 500;
        responseJson.success = false;
        responseJson.message = 'Error al obtener el saldo';
        return res.status(500).json(responseJson);
    }
};   

payController.payment = async (req: Request, res: Response) => {

    const responseJson: ResponseModel = new ResponseModel();

    const { dni, phone, amount } = req.body;

    const validate = validateRecharge(req);

    if (!validate.success) {
        return res.status(400).json(validate);
    }

    try {

        const connection = await pool.getConnection();
        const [user]: any = await connection.query('SELECT id, email FROM users WHERE dni = ? AND phone = ?', [dni, phone]);

        if (user.length === 0) {
            connection.release();
            responseJson.code = 404;
            responseJson.success = false;
            responseJson.message = 'Usuario no encontrado';
            responseJson.data = null;
            return res.status(404).json(responseJson);
        }

        //tomamos el id del usuario y su email
        const userId = user[0].id;
        const email = user[0].email;

        //generando token de compra de 6 caracteres y id_session de 6 caracteres
        const token = crypto.randomBytes(3).toString('hex');
        const sessionId = crypto.randomBytes(6).toString('hex');

        //guardamos la session en la base de datos
        await connection.query('INSERT INTO shopping (id_user, token, id_session, amount) VALUES (?, ?, ?, ?)', [userId, token, sessionId, amount]);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Token de confirmación de compra',
            text: `Saludos ${user[0].fullname}, te hemos generado un token de confirmación para realizar tu compra dando clic en el siguiente enlace: http://localhost:3000/wallet/buy/confirm/${sessionId}/${token}`
        };

        await sendEmail(mailOptions);
    
        connection.release();
        responseJson.code = 200;
        responseJson.success = true;
        responseJson.message = 'Compra exitosa, se ha enviado un token de confirmación a tu correo';
        responseJson.data = null;
        return res.status(200).json(responseJson);

    } catch (error) {

        console.log('Error al generar en el proceso de compra', error);
        responseJson.code = 500;
        responseJson.success = false;
        responseJson.message = 'Error al generar en el proceso de compra';
        responseJson.data = null;
        return res.status(500).json(responseJson);

    }
};

payController.confirmPayment = async (req: Request, res: Response) => {;

    const responseJson: ResponseModel = new ResponseModel();
    const { token, sessionId } = req.body;

    if (!token || !sessionId) {
        responseJson.code = 400;
        responseJson.success = false;
        responseJson.message = `El ${ sessionId ? 'ID  de sesión' : token ? 'token' : 'token y ID de sesión' } es requerido`;
        responseJson.data = null;
        return res.status(400).json(responseJson);
    }

    try {
        const connection = await pool.getConnection();

        //validamos si ya se ha confirmado el pago, si deleted_at es diferente de null ya se ha confirmado
        const [used]: any = await connection.query('SELECT id_user, amount FROM shopping WHERE id_session = ? AND token = ? AND deleted_at IS NOT NULL', [sessionId, token]);
        
        if (used.length > 0) {
            connection.release();
            responseJson.code = 400;
            responseJson.success = false;
            responseJson.message = 'La compra ya ha sido confirmada anteriormente';
            responseJson.data = null;
            return res.status(400).json(responseJson);
        }

        const [shopping]: any = await connection.query('SELECT id_user, amount FROM shopping WHERE id_session = ? AND token = ? AND deleted_at IS NULL', [sessionId,token]);

        if (shopping.length === 0) {
            connection.release();
            responseJson.code = 400;
            responseJson.success = false;
            responseJson.message = 'Token o ID de sesión incorrecto';
            responseJson.data = null;
            return res.status(400).json(responseJson);
        }

        const userId = shopping[0].id_user;
        const amount = shopping[0].amount;

        await connection.query('UPDATE wallets SET balance = balance - ? WHERE id_user = ?', [amount, userId]);
        
        const wallet: any = await connection.query('SELECT balance FROM wallets WHERE id_user = ?', [userId]);

        const date = new Date(); 
        await connection.query('UPDATE shopping SET deleted_at = ? WHERE id_session = ? AND token = ?', [date, sessionId, token]);

        connection.release();
        responseJson.code = 200;
        responseJson.success = true;
        responseJson.message = 'Confirmación de pago exitosa';
        responseJson.data = { balance: wallet[0].balance };
        return res.status(200).json(responseJson);

    } catch (error) {
        console.log('Error al confirmar el compra', error);
        responseJson.code = 500;
        responseJson.success = false;
        responseJson.message = 'Error al confirmar el compra';
        responseJson.data = null;
        return res.status(500).json(responseJson);
    }
};

function validateRecharge(req: Request) {
    
    const responseJson : ResponseModel = new ResponseModel();
    responseJson.code = 400;
    responseJson.success = true;
    responseJson.data = null;

    if (!req.body.dni) {
        responseJson.message = 'El número de documento es requerido';
        responseJson.success = false;
    }

    if (!req.body.phone) {
        responseJson.message = 'El número de teléfono es requerido';
        responseJson.success = false;
    }

    if (!req.body.amount) {
        responseJson.message = 'El monto es requerido';
        responseJson.success = false;
    }

    return responseJson;
};

function validateBalance(req: Request) {
        
    const responseJson : ResponseModel = new ResponseModel();
    responseJson.code = 400;
    responseJson.success = true;
    responseJson.data = null;

    if (!req.query.dni) {
        responseJson.message = 'El número de documento es requerido';
        responseJson.success = false;
    }

    if (!req.query.phone) {
        responseJson.message = 'El número de teléfono es requerido';
        responseJson.success = false;
    }

    return responseJson;
};

async function validateWallet(dni: string, phone: string) {
    const connection = await pool.getConnection();
    const [user]: any = await connection.query('SELECT w.balance FROM wallets w INNER JOIN users u ON w.id_user = u.id WHERE u.dni = ? AND u.phone = ?', [dni, phone]);
    connection.release();
    
    if (user.length === 0) {
        return false;
    }

    return true;
}
;
export default payController;