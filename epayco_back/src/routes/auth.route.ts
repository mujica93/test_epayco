import { Router } from "express";
import authController from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', authController.register);

export default authRoutes;