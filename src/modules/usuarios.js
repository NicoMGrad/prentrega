import axios from 'axios'

export default {
    namespaced:true,
    state:{
        usuarios: [],
        registro: [],
        userLogueado: null
    },
    mutations: {
        CARGAR_USUARIOS: (state, usuarios) => {
            state.usuarios = usuarios;
        },
        CARGAR_LOGUEADO: (state, usuario) => {
            state.userLogueado = usuario;
        }
    },
    actions: {
        traerUsuarios: ({commit}) => {
            let url = 'users';
            axios.get(url)
            .then(response=>{
                commit('CARGAR_USUARIOS',response.data)
            })
        },
        setUsuarioLogueado: ({commit}, usuario) => {
            commit('CARGAR_LOGUEADO', usuario)
        }
    },
    getters: {
        listaUsuarios(state){
            return state.usuarios
        },
        usuarioLogueado(state){
            return state.userLogueado
        }
    }
}