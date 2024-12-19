import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from "../db.js";  // A conexão com o banco de dados

// Função para registrar usuário
export const registerUser = async (req, res) => {
  const { username, email, password, empresa } = req.body;

  try {
    // Verificar se o usuário já existe
    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "Usuário já existe com este e-mail." });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const result = await db.query("INSERT INTO users (username, email, password, empresa) VALUES (?, ?, ?, ?)", 
                                  [username, email, hashedPassword, empresa]);
    
    // Gerar um token JWT
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({ message: "Usuário registrado com sucesso!", token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor. Tente novamente." });
  }
};

// Função para login de usuário
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.status(400).json({ message: "E-mail ou senha inválidos." });
    }

    // Verificar a senha
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "E-mail ou senha inválidos." });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login realizado com sucesso!", token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor. Tente novamente." });
  }
};
