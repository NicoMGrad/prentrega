<template>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Días</th>
          <th>Envío</th>
          <th>Preview</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
            <td>{{producto.producto}}</td>
            <td>{{producto.precio  | formatPrecio}}</td>
            <td>{{producto.dias}}</td>
            <td>{{producto.envio | formatPrecio}}</td>
            <td class="text-center">
              <img :src="require(`../assets/imgs/${producto.srcimg}`)" :alt="producto.producto" :title="producto.producto" class="item-img-small" />
            </td>
            <td class="text-center">
              <button 
                class="btn-editar"
              >
                Editar
                <v-icon>
                  mdi-note-edit-outline
                </v-icon>
              </button>
              <button 
                class="btn-borrar"
              >
                Borrar
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </button>
            </td>
        </tr>
        <tr>
          <td colspan="6" class="text-right display-1 font-weight-light pa-5">
            Agregar nuevo producto
            <v-icon>
              mdi-plus-circle-outline
            </v-icon>
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
import { mapState } from 'vuex'
import DetalleProductos from '../mixins/DetalleProductos';

export default {
    computed: {
      ...mapState([
        'productos'
      ])
    },
    mixins:[DetalleProductos],
    mounted() {
      this.$store.dispatch('traerProductos');
    }
  }
</script>
<style scoped>
.v-data-table {
    width: 50vw;
    margin: auto;
}

table {
  width: 100%;
  max-width: 700px;
  background: #fff;
  margin: 1em auto;
  border: 1px solid rgba(34,36,38,.15);
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0.28571429rem;
  text-align: left;
  color: rgba(0,0,0,.87);
  border-collapse: separate;
  border-spacing: 0;
  font-size: .8rem;
  letter-spacing: .1px;
}

thead {
  background: #f6f6f6;
  border-top: none;
}


thead tr:first-child>th:first-child {
    border-radius: 0.28571429rem 0 0 0;
}

thead > tr th:last-child {
  width: 240px;
}

tbody tr:last-child td,
tbody tr:last-child td i {
  color: grey;
}

tr td:first-child, .ui.celled.table tr th:first-child {
    border-left: none;
}


tr {
    border-top: 1px solid rgba(34,36,38,.1);
}

td, th {
  padding: .5rem;
  border-left: 1px solid rgba(34,36,38,.1);
}

td{
    border-top: 1px solid rgba(34,36,38,.1);
}

tr:hover{
  cursor: pointer;
  background: #f6f6f6;
  transition: all ease 100ms;
}

.item-img-small {
  height: 25px;
}

.btn-editar,
.btn-borrar {
  font-size:.9rem;
  padding:.5rem .7rem;
  margin:.2rem;
  border-radius:.3rem;
  background: #f4f4f4;
}

.btn-editar:hover,
.btn-borrar:hover {
  filter: brightness(.9);
  transition: var(--animation-hover);
  cursor: pointer;
}

.btn-editar,
.btn-editar > i {
  color: var(--verde-oscuro);
}

.btn-borrar,
.btn-borrar > i {
  color: var(--rojo);
}
</style>