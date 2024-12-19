import axios from 'axios';

// Criando uma instância do axios
const api = axios.create({
  baseURL: "http://localhost:8800/api/login",
  headers: {
    'Content-Type': 'application/json',
  },
});

const userService = {
  // Função de cadastro de usuário
  async registerUser(userData) {
    try {
      const response = await api.post("/", userData); // POST para /api/register
      console.log("Usuário registrado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  },

  // Função de login de usuário
  async loginUser(credentials) {
    try {
      const response = await api.post("/login", credentials); // POST para /api/login
      console.log("Usuário logado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },
};

export default userService;
