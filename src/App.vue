<template>
  <v-app>
    <header-principal></header-principal>
    <v-main>
      <v-spacer></v-spacer>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderPrincipal from './components/HeaderPrincipal.vue'


export default {
  name: 'App',
  components: {
    HeaderPrincipal
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.v-main {
  padding-top: 7.5rem!important;
}

 .v-application p {
   margin-bottom:unset!important;
 }

 .theme--light.v-input input, .theme--light.v-input textarea {
   color: var(--rojo);
 }

 .v-application .error--text {
  color: var(--rojo) !important;
  caret-color: var(--rojo) !important;
}
.margint2 {
  margin-top: 2rem;
}

.contenedor-productos {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>