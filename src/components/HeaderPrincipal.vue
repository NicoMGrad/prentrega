<template>
    <div class="header">
        <img src="../assets/imgs/logo_evergreen01.svg" alt="Evergreen tienda orgánica" class="logo" />
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <router-link to="/cargarproductos">Productos</router-link>
        <div class="combo-carrito">
            <p style="color:var(--rojo)"> <span class="font-weight-bold">{{ sumarPrecios() }}</span></p>
            <modal-carrito></modal-carrito>
        </div>
        <modal-ingresar class="rounded-xl" rounded-xl></modal-ingresar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import ModalCarrito from './ModalCarrito.vue'
import sumarPrecios from 'vue'
import ModalIngresar from './ModalIngresar.vue';

export default {
    name:'HeaderPrincipal',
    components:{
        ModalCarrito,
        ModalIngresar
    },
    computed: {
      ...mapState([
        'carrito'
        ])
    },
    mixins: [ sumarPrecios ]
}
</script>
<style>
@import '../assets/estilos/header.css';
</style>