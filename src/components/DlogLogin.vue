<template>
      <form>
        <v-text-field
          v-model="email"
          type="email"
          :error-messages="emailErrors"
          label="E-mail"
          prepend-icon="mdi-email-outline"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordErrors"
            label="Contraseña"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            prepend-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="text-right mt-6">
          <v-btn class="mr-4" outlined color="indigo" large @click="clear">
            Limpiar
          </v-btn>
          <v-btn @click="submit" depressed color="primary" large >
            Ingresar
          </v-btn>
        </div>
    </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import { mapGetters,mapActions } from 'vuex'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },

    data: () => ({
      email: '',
      password: '',
      showPassword: false,
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Chequeá que sea un formato válido')
        !this.$v.email.required && errors.push('¡No te olvides de tu email!')
        return errors
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength &&
          errors.push("La contraseña tiene que tener mínimo 8 caracteres");
        !this.$v.password.required && errors.push("¡No te olvides de la contraseña!");
        return errors;
      },
     ...mapGetters('usuarios',
      ['listaUsuarios'])
    },
    mounted() {
      this.traerUsuarios();
    },
    methods: {
        submit () {
            this.$v.$touch();
            if(!this.$v.$invalid){
                if(this.listaUsuarios.some(u => u.email === this.email && u.password === this.password)){
                    this.loggearUsuario();
                    this.$emit('usuario',this.listaUsuarios.filter(this.buscarUsuarioLogueado)[0].nombre);
                    this.clear();
                    alert('¡Bienvenido!');
                    this.$emit('cerrar',false);
                    return true
                } else {
                    alert('Hay un error en los datos ingresados.');
                    console.log(this.email);
                    return false
                }
            }
        },
        loggearUsuario() {
            let nombre = this.listaUsuarios.filter(this.buscarUsuarioLogueado);
            console.log(nombre[0].nombre);
            this.setUsuarioLogueado(nombre[0].nombre);
        },
        ...mapActions('usuarios', ['traerUsuarios']),
        ...mapActions('usuarios', ['setUsuarioLogueado']),
        clear () {
            this.$v.$reset()
            this.email = ''
            this.password = ''
        },
        buscarUsuarioLogueado(usuario) {
            return usuario.email === this.email;
        }
    }
  }

</script>

