<template>
  <v-dialog
        v-model="dialog"
        persistent
        max-width="40vw"
        content-class="rounded-xl"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        x-large
        v-bind="attrs"
        v-on="on"
        @click="entrasOsalis"
      >
       {{ mostrarUsuario() }}
      </v-btn>
    </template>

    <!--Entrar-->
    <v-card class="rounded-xl" rounded="xl" v-if="entrar">
      <v-card-title class="px-4rlay">
        <button @click="showLogin()" class="font-weight-light" :class="{ fontBlack : bold}" id="btnIngresa">Ingresá</button>
        <button @click="showRegis()" class="font-weight-light" :class="{ fontBlack : !bold}" id="btnRegistrate">Registrate</button>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <dlog-login v-if="showIngresar" @cerrar="loCierro"></dlog-login>
        <dlog-registrarse v-if="showRegistrar" @cerrar="loCierro"></dlog-registrarse>
      </v-container>
    </v-card>

    <!--Salir-->
    <v-card class="rounded-xl" rounded="xl" v-if="salir">
      <h2 class="display-1 font-weight-bold text-center mt-3">No te vayas, chavo :(</h2>
        <v-btn icon @click="dialog = false" id="cerrar">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      <v-container>
        <div class="text-center mt-6">
            <v-btn class="mr-4" outlined color="indigo" large @click="dialog = false">
                No, continuar comprando
            </v-btn>
            <v-btn @click="sayonaraIdiotas" depressed color="primary" large >
                Sí, hasta luego
            </v-btn>
        </div>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>

  import { mapGetters,mapActions } from 'vuex'
  import DlogLogin from './DlogLogin.vue'
  import DlogRegistrarse from './DlogRegistrarse.vue'

  export default {

    components: { DlogLogin, DlogRegistrarse },

    data: () => ({
      showIngresar: true,
      showRegistrar: false,
      entrar: true,
      salir: false,
      dialog: false,
      bold: true,
      nombreUser: 'Ingresar'
    }),

    computed: {
     ...mapGetters('usuarios',
      ['listaUsuarios','usuarioLogueado'])
    },

    mounted() {
      this.traerUsuarios()
    },

    methods: {
      ...mapActions('usuarios',
      ['traerUsuarios','setUsuarioLogueado']),
      showLogin()
      {
            return  this.showIngresar= true, 
                    this.showRegistrar= false,
                    this.bold = true
      },
      showRegis()
      {
          return  this.showIngresar= false, 
                  this.showRegistrar= true,
                  this.bold = false
      },
      loCierro(value)
      {
        return this.dialog = value;
      },
      entrasOsalis()
      {
        if(this.mostrarUsuario() == 'Ingresar')
        {
          console.log('entrando');
          return  this.salir = false,
                  this.entrar = true
        } 
        else 
        {
          console.log('saliendo');
          return  this.salir = true,
                  this.entrar = false
        }
      },
      sayonaraIdiotas()
      {
        this.setUsuarioLogueado(null);
        return this.dialog = false
      },
      mostrarUsuario()
      {
        if(this.usuarioLogueado == null){
          return 'Ingresar'
        } else {
          return this.usuarioLogueado
        }
      }
    }
  }

</script>
<style scoped>

.v-card {
  padding: 1.3rem!important;
}

.fontBlack {
    font-weight: 600!important;
    color: #8cc63f!important;
}

#btnIngresa,
#btnRegistrate {
  font-size: 2rem;
  color:#d1d1d1;
}

#btnRegistrate {
  margin-left: 1rem;
}

#btnIngresa:hover,
#btnRegistrate:hover {
  filter: brightness(1.1);
  transition: all ease-in-out 150ms;
}

#card-salir {
  position: relative;
}
#cerrar {
  position: absolute;
  right: 1rem;
  top:1rem;
}

</style>
