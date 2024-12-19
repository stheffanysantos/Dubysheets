<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Bem-vindo</h1>
      <p class="login-subtitle">Faça login para continuar</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="User">Usuário</label>
          <input
            type="text"
            id="User"
            v-model="User"
            placeholder="Digite seu Usuário"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" class="btn btn-login" @click="redirectToPlanilha">Entrar</button>
      </form>
      <p class="register-text">
        Não tem uma conta?
        <a href="#" @click.prevent="redirectToCadastro">Cadastre-se</a>
      </p>
    </div>
  </div>
</template>

<script>
import userService from "@/services/login.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        const response = await userService.loginUser(credentials); // Chamando o serviço de login
        this.successMessage = response.message;
        this.errorMessage = '';
        // Aqui você pode armazenar o token JWT para autenticação em futuras requisições
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
        this.successMessage = '';
      }
    },
  },
  redirectToPlanilha() {
      this.$router.push("/planilha"); // Rota para a página da planilha
    },
    redirectToCadastro() {
      this.$router.push("/cadastro"); // Rota para a página de cadastro
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap");

body {
  margin: 0;
  font-family: "Nunito", sans-serif;
  background-color: #412884;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
  background-color: #412884;
}

.login-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-title {
  font-size: 24px;
  color: #412884;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 16px;
  color: #6b6b6b;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #322871;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f9f9f9;
}

input:focus {
  outline: none;
  border-color: #412884;
  box-shadow: 0 0 4px rgba(65, 40, 132, 0.2);
}

.btn-login {
  background: #73ba60;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
}

.btn-login:hover {
  background: #5d9f4b;
}

.register-text {
  font-size: 14px;
  margin-top: 20px;
  color: #6b6b6b;
}

.register-text a {
  color: #412884;
  text-decoration: none;
  font-weight: bold;
}

.register-text a:hover {
  text-decoration: underline;
}

/* Responsivo */
@media (max-width: 768px) {
  .login-card {
    padding: 20px;
  }
}
</style>
