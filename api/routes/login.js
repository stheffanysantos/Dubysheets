import express from 'express';
import { registerUser, loginUser } from '../controllers/login.js';

const router = express.Router();

// Rota de cadastro de usuário
router.post("/register", registerUser);

// Rota de login de usuário
router.post("/login", loginUser);

export default router;
