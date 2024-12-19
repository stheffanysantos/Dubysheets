<template>
  <div class="cadastro-container">
    <h1>Cadastro de Usuário</h1>
    <p class="login-subtitle">Realize o seu cadastro.</p>
    <form @submit.prevent="fazerCadastro">
      <div class="form-group">
        <label for="empresa">Empresa</label>
        <input
          type="text"
          id="empresa"
          v-model="usuario.empresa"
          placeholder="Digite o nome da empresa"
          required
        />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          v-model="usuario.nome"
          placeholder="Digite seu nome completo"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="usuario.email"
          placeholder="Digite seu email"
          required
        />
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input
          type="password"
          id="senha"
          v-model="usuario.senha"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button type="submit" @click="redirectToPlanilha">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import userService from "@/services/login.js";

export default {
  data() {
    return {
      usuario: {
        nome: "",
        email: "",
        senha: "",
        empresa: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async fazerCadastro() {
      if (this.formValido) {
        try {
          const newUser = {
            empresa: this.usuario.empresa,
            nome: this.usuario.nome,
            email: this.usuario.email,
            senha: this.usuario.senha,
          };

          // Chamando o serviço de cadastro
          await userService.registerUser(newUser);

          this.successMessage = "Cadastro realizado com sucesso!";
          this.errorMessage = "";

          // Redirecionar para a página de planilhas após o cadastro bem-sucedido
          setTimeout(() => {
            this.$router.push("/planilha");
          }, 1000);
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Erro ao fazer cadastro. Tente novamente.";
          this.successMessage = "";
          console.error("Erro no cadastro:", error);
        }
      } else {
        this.errorMessage = "Todos os campos são obrigatórios!";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style>
.cadastro-container {
  font-family: Nunito, Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px auto;
  max-width: 450px;
  background: #f4f7fb;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #412884;
  margin-bottom: 10px;
  text-align: center;
}

.login-subtitle {
  font-size: 16px;
  color: #6b6b6b;
  margin-bottom: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  color: #322871;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f9f9f9;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background: #73ba60;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: #322871;
}
</style>
