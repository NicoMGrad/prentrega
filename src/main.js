import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";


import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false

Vue.prototype.$urlApi = axios
axios.defaults.baseURL = 'https://6238139a00ed1dbc5aae04f7.mockapi.io/api/tp2/';

Vue.filter('formatPrecio', function(precio){
  let aPesos = new Intl.NumberFormat('es-AR', {
  style:'currency',
  currency:'ARS'
  });
  return aPesos.format(precio/100);
});

Vue.filter('formatPrecioCentavos', function(precio){
let aPesos = new Intl.NumberFormat('es-AR', {
  style:'currency',
  currency:'ARS'
  });
let newPrice = aPesos.format(precio/100).split(',');
return `${newPrice[0].substring(2)}<span class="centavos">${newPrice[1]}</span>`
});

Vue.filter('envios', function(envio){
if (envio == 0) {
  return 'Gratis'
} else {
  let aPesos = new Intl.NumberFormat('es-AR', {
  style:'currency',
  currency:'ARS'
  });
  return aPesos.format(envio/100);
}
});

Vue.mixin({
methods: {
  sumarPrecios(){
      let monto = 0;
      for(let i = 0; i < this.carrito.length; i++){
          monto += this.carrito[i].precio
      }
      let aPesos = new Intl.NumberFormat('es-AR', {
          style:'currency',
          currency:'ARS'
      });
      return aPesos.format(monto/100);
  },
  agregarCarrito() {
    this.$store.dispatch('agregarAcarrito', {
      id: this.id,
      producto: this.producto,
      precio: this.precio,
      cantidad: this.cantidad,
      contador: 1
    })
  }
}
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
