<template>
  <div class="contenedor-productos">
      <card-producto v-for="producto in productos" :key="producto.producto" :producto="producto.producto" :srcimg="producto.srcimg" :precio="producto.precio" :cantidad="producto.cantidad" :descripcion1="producto.descripcion1" :envio="producto.envio" :norma="producto.norma" :dias="producto.dias" :id="producto.id"></card-producto>
  </div>
</template>

<script>
  import CardProducto from '../components/CardProducto.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'HomeView',

    components: {
      CardProducto
    },
    computed: {
      ...mapState([
        'productos'
      ])
    },
    mounted() {
      this.$store.dispatch('traerProductos');
    }
  }
</script>
