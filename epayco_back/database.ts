import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//creamos la DB si no existe
const createDB = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        connection.release();
        console.log('DB created or already exist');
    } catch (error) {
        console.log('Error creating DB', error);
    }
};

//creamos las tablas si no existen
const createTables = async () => {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            dni VARCHAR(10) NOT NULL,
            fullname VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(15) NOT NULL
    )`;

    const walletsTable = `
        CREATE TABLE IF NOT EXISTS wallets (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_user INT NOT NULL,
            balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
            FOREIGN KEY (id_user) REFERENCES users(id)
    )`;
        
    const shoppingTable = `
        CREATE TABLE IF NOT EXISTS shopping (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_user INT NOT NULL,
            token VARCHAR(6) NOT NULL,
            id_session VARCHAR(32) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (id_user) REFERENCES users(id)
    )`;
    
    const insertUser = `INSERT INTO users (dni, fullname,email,phone) VALUES ("21640301","Yefferson Mujica","jefersonmujica@gmail.com","04127261953")`;
    
    const insertWallet = `INSERT INTO wallets (id_user, balance) VALUES (1, 100)`;

    try {
        const connection = await pool.getConnection();
        await connection.query(`USE ${process.env.DB_NAME}`);
        await connection.query(usersTable);
        await connection.query(walletsTable);
        await connection.query(shoppingTable);
        await connection.query(insertUser);
        await connection.query(insertWallet);
        connection.release();
        console.log('Tables created or already exist');
    } catch (error) {
        console.log('Error creating tables', error);
    }
};

//inicializamos la db y creamos las tablas si no existen
export const initializeDB = async () => {
    await createDB();
    await createTables();
};

// initializeDB();

export default pool;