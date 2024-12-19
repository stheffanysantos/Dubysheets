import axios from "axios";

// Criando uma instância do axios
const api = axios.create({
  baseURL: "http://localhost:8800/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

const pedidoService = {
  async getPedidos() {
    try {
      const response = await api.get("/"); // GET para /api/
      console.log("Pedidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  },

  async addPedido(pedido) {
    try {
      const response = await api.post("/", pedido); // POST para /api/
      console.log("Pedido criado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    }
  },

  async updatePedido(id, pedido) {
    try {
      const response = await api.put(`/${id}`, pedido); // PUT para /api/:id
      console.log("Pedido atualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  },

  async deletePedido(id) {
    try {
      const response = await api.delete(`/${id}`); // DELETE para /api/:id
      console.log("Pedido deletado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      throw error;
    }
  },
};



export default pedidoService;
