<template>
  <div class="app">
    <div class="main-container">
      <!-- Formulário de Cadastro -->
      <div class="form-container">
        <h1><strong>Cadastrar Pedido</strong></h1>
        <form @submit.prevent="addPedido">
          <!-- Formulário -->
          <div class="form-group">
            <label for="data">Data:</label>
            <input type="date" id="data" v-model="novoPedido.data" required />
          </div>
          <div class="form-group">
            <label for="produto">Produto:</label>
            <input type="text" id="produto" v-model="novoPedido.produto" required />
          </div>
          <div class="form-group">
            <label for="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" v-model.number="novoPedido.quantidade" required />
          </div>
          <div class="form-group">
            <label for="preco">Preço:</label>
            <input type="number" id="preco" v-model.number="novoPedido.preco" placeholder="Opcional" step="0.01" />
          </div>
          <div class="form-group">
            <label for="unidade">Unidade:</label>
            <input type="text" id="unidade" v-model="novoPedido.unidade" required />
          </div>
          <div class="form-group">
            <label for="empresa">Empresa:</label>
            <input type="text" id="empresa" v-model="novoPedido.empresa" required />
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select id="status" v-model="novoPedido.status" required>
              <option value="concluido">Concluído</option>
              <option value="preparando">Preparando</option>
              <option value="ja foi">Já foi</option>
            </select>
          </div>
          <div class="form-group">
            <label for="observacao">Observação:</label>
            <textarea id="observacao" v-model="novoPedido.observacao" placeholder="Opcional"></textarea>
          </div>
          <div class="form-group">
            <label for="previsao">Previsão:</label>
            <input type="date" id="previsao" v-model="novoPedido.previsao" required />
          </div>
          <button type="submit" class="btn">Cadastrar</button>
        </form>
      </div>

      <!-- Relatório de Pedidos -->
      <div class="relatorio-container">
        <h2>Relatório de Pedidos</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Unidade</th>
              <th>Empresa</th>
              <th>Previsão</th>
              <th>Status</th>
              <th>Observação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pedido, index) in pedidos" :key="index">
              <td>{{ formatarData(pedido.data) }}</td>
              <td>{{ pedido.produto }}</td>
              <td>{{ pedido.quantidade }}</td>
              <td>{{ pedido.preco || 'N/A' }}</td>
              <td>{{ pedido.unidade }}</td>
              <td>{{ pedido.empresa }}</td>
              <td>{{ formatarData(pedido.previsao) }}</td> <!-- Também formate a data de previsão -->
              <td>{{ pedido.status }}</td>
              <td>{{ pedido.observacao || 'N/A' }}</td>
              <td>
                <button @click="editarPedido(index)" class="btn btn-edit">Editar</button>
                <button @click="excluirPedido(index)" class="btn btn-delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Edição -->
    <ModalDeEdicao
      :isVisible="isEditing"
      :pedidoEditado="pedidoEditado"
      @fechar="fecharModal"
      @salvar="salvarPedidoEditado"
    />
  </div>
</template>

<script>
import ModalDeEdicao from './ModalDeEdicao.vue';
import pedidoService from "@/services/api";

export default {
  components: {
    ModalDeEdicao,
  },
  data() {
    return {
      pedidos: [],
      isEditing: false,
      pedidoEditado: null,
      novoPedido: {
        data: "",
        produto: "",
        quantidade: 0,
        preco: null,
        unidade: "",
        empresa: "",
        previsao: "",
        status: "preparando",
        observacao: "",
      },
    };
  },
  methods: {
    // Método para buscar os pedidos do backend
    async getPedidos() {
      try {
        this.pedidos = await pedidoService.getPedidos();
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    },

    // Método chamado para adicionar novo pedido
    async addPedido() {
      try {
        const pedidoAdicionado = await pedidoService.addPedido(this.novoPedido);
        if (pedidoAdicionado && pedidoAdicionado.id) {
          this.pedidos.push(pedidoAdicionado); // Adiciona pedido à lista
        }
        this.resetForm(); // Limpa o formulário após adicionar
      } catch (error) {
        console.error("Erro ao adicionar pedido:", error);
      }
    },

    // Formata a data no formato 'dd/mm/yyyy'
    formatarData(data) {
      const date = new Date(data);
      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const ano = date.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },

    // Reseta os dados do formulário
    resetForm() {
      this.novoPedido = {
        data: "",
        produto: "",
        quantidade: 0,
        preco: null,
        unidade: "",
        empresa: "",
        previsao: "",
        status: "preparando",
        observacao: "",
      };
    },

    // Abre o modal para editar o pedido
    editarPedido(index) {
      this.pedidoEditado = { ...this.pedidos[index] };
      this.isEditing = true;
    },

    // Método que salva o pedido editado e atualiza a lista
    async salvarPedidoEditado(pedidoAtualizado) {
      try {
        // Atualiza o pedido na lista de pedidos
        const index = this.pedidos.findIndex((p) => p.id === pedidoAtualizado.id);
        if (index !== -1) {
          this.pedidos[index] = pedidoAtualizado;
        }

        // Chama o backend para atualizar o pedido
        const resposta = await pedidoService.updatePedido(pedidoAtualizado.id, pedidoAtualizado);
        if (resposta) {
          console.log("Pedido atualizado no backend:", resposta);
        }

        // Fechar o modal após salvar
        this.fecharModal();
      } catch (error) {
        console.error("Erro ao salvar pedido editado:", error);
      }
    },

    // Método para excluir um pedido
    async excluirPedido(index) {
      try {
        const pedido = this.pedidos[index];
        await pedidoService.deletePedido(pedido.id); // Exclui do backend
        this.pedidos.splice(index, 1); // Remove da lista no frontend
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
      }
    },

    // Método para fechar o modal
    fecharModal() {
      this.isEditing = false;
      this.pedidoEditado = null;
    },

    // Método que é chamado quando o pedido é editado no modal
    atualizarPedidos() {
      this.getPedidos(); // Recarrega os pedidos após a edição
    },
  },
  created() {
    this.getPedidos(); // Carrega os pedidos ao iniciar o componente
  },
};
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Nunito:200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);

  .app {
    font-family: Nunito, Tahoma, Geneva, Verdana, sans-serif;
    margin: 20px auto;
    max-width: 80%; /* Largura máxima */
    background: #f4f7fb;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .main-container {
    display: flex;
    gap: 20px;
    margin: 0 auto; /* Centraliza o conteúdo e remove margens laterais */
  }

  .form-container, 
  .relatorio-container {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px; /* Ajuste o preenchimento */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
  }

  .form-container {
    margin-right: 20px; /* Ajuste a margem para o formulário */
    padding: 20px;
  }

  .relatorio-container {
    max-height: 400px;
    width: 100%;
    margin-left: 0;
  }

  h1 {
    font-size: 24px;
    color: #12283f;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    color: #12283f;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 16px; /* Menor margem para os campos */
  }

  label {
    display: block;
    font-size: 14px;
    color: #322871;
    margin-bottom: 6px; /* Menor margem entre label e campo */
  }

  input, select, textarea, button {
    width: 100%;
    padding: 8px; /* Menor preenchimento nos campos */
    margin-top: 6px; /* Menor margem superior */
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }

  input, select, textarea {
    background-color: #f9f9f9;
  }

  button {
    cursor: pointer;
    background: #73ba60;
    color: white;
    border: none;
    padding: 10px 16px; /* Ajuste no padding do botão */
    border-radius: 6px;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  button:hover {
    background: #5d9f4b;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  th, td {
    text-align: left;
    padding: 7px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #412884;
    color: white;
  }

  tr:hover {
    background-color: #f4f4f4;
  }

  .btn {
    padding: 10px 15px;
    border-radius: 5px;
  }

  .btn-edit {
    background: #412884;
    color: white;
  }

  .btn-delete {
    background: #dc3545;
    color: white;
  }

  .btn-edit:hover {
    background: #322871;
  }

  .btn-delete:hover {
    background: #9a2e2f;
  }

  /* Ajuste responsivo para telas menores */
  @media (max-width: 768px) {
    .main-container {
      flex-direction: column; /* Alinha os itens em coluna */
    }

    .form-container,
    .relatorio-container {
      width: 100%; /* Cada seção ocupa 100% da largura */
      padding: 20px;
    }

    .app {
      max-width: 100%; /* Ajuste a largura máxima para telas menores */
    }
  }
</style>

  