<template>
  <div id="app">
    <div class="image-header">
      <img src="@/assets/dubyicon.png" alt="Minha Imagem" />
    </div>
    <!-- O router-view é o ponto onde as páginas serão carregadas -->
    <router-view />
    <RodapePedido />
  </div>
</template>

<script>
import RodapePedido from './components/RodapePedido.vue';

export default {
  components: {
    RodapePedido,
  },
};
</script>

<style>
body {
  background-color: #412884; /* Cor de fundo desejada */
}

.image-header {
  display: flex;
  align-items: center;
}
</style>
