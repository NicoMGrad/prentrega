<template>
    <form>
        <v-text-field
            v-model="name"
            type="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Nombre y Apellido"
            prepend-icon="mdi-account-outline"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
        ></v-text-field>

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

        <v-select
          v-model="select"
          :items="genero"
          :error-messages="selectErrors"
          label="Género"
          prepend-icon="mdi-account-question-outline"
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>

        <div class="text-right">
            <v-btn class="mr-4" outlined color="indigo" large @click="clear">
                Limpiar
            </v-btn>
            <v-btn @click="submit" depressed color="primary" large >
                Registrarse
            </v-btn>
        </div>
    </form>

</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import { mapGetters,mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],
    name: 'DlogRegistrarse',

    validations: {
      name: { required, maxLength: maxLength(50) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
      password: { required, minLength: minLength(6) },
      confirmPassword: { sameAsPassword: sameAs("password") }
    },

    data: () => ({
      name: '',
      select: null,
      certificacion: [
        'ISO 2022',
        'AGRA 3001',
        'GREENARROW',
        'SUNN-2020'
      ],
      dialog: false,
    }),

    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Seleccioná la certificación por favor.')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('El nombre debe tener menos de 50 caracteres.')
        !this.$v.name.required && errors.push('¡No te olvides de tu nombre!')
        return errors
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

            if(this.listaUsuarios.some(u => u.email === this.email)){
                alert('Email se encuentra registrado');
                console.log(this.email);
                return false
            } else {
                console.log(this.email);

                let url = 'users';
                let genero = document.querySelector('div[class="v-select__selection v-select__selection--comma"]').innerText;

                axios.post(url,{
                  email: this.email,
                  nombre: this.name,
                  password: this.password,
                  genero: genero,
                  rol: 'user'
                });
                this.traerUsuarios();
                this.clear();
                alert('¡Registrado!');
                this.$emit('cerrar',false);
                return true
            }

          }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.password = ''
        this.confirmPassword = ''
        this.checkbox = false
      },
      ...mapActions('usuarios',
      ['traerUsuarios'])
    }
  }

</script>
