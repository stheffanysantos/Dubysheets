import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api/pedidos";

const pedidoService = {
  // Buscar todos os pedidos
  async getPedidos() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error.response?.data || error.message);
      throw error;
    }
  },

  // Criar um novo pedido
  async addPedido(pedido) {
    try {
      const response = await axios.post(API_BASE_URL, pedido);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error.response?.data || error.message);
      throw error;
    }
  },

  // Atualizar um pedido existente
  async updatePedido(id, pedidoAtualizado) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, pedidoAtualizado);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error.response?.data || error.message);
      throw error;
    }
  },

  // Excluir um pedido
  async deletePedido(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir pedido:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default pedidoService;
