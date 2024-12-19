import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import CadastroPage from '../components/CadastroPage.vue';
import PlanilhaPedidos from '../components/PlanilhaPedidos.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: CadastroPage,
  },
  {
    path: '/planilha',
    name: 'PlanilhaPedidos',
    component: PlanilhaPedidos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
